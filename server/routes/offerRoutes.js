const express = require('express');
const Trade = require('../schemas/Trade');
const Offer = require('../schemas/Offer');
const User = require("../schemas/User");

const router = express.Router();

let clients = [];

async function eventsHandler(request, response, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };

    try {
        const offerData = await Offer.find({}).lean().exec();

        const offerEventData = `data: ${JSON.stringify(offerData)}\n\n`;

        response.writeHead(200, headers);
        response.write(offerEventData);

        const clientId = Date.now();

        const newClient = {
            id: clientId,
            response
        };

        clients.push(newClient);

        request.on('close', () => {
            console.log(`${clientId} Connection closed`);
            clients = clients.filter(client => client.id !== clientId);
        });
    } catch (error) {
        console.error(error);
        response.status(500).end();
    }
}

router.get('/all', eventsHandler);

function sendEventsToAll(newOffer) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newOffer)}\n\n`))
}

router.get('/all/:userId', async(req, res) => {
    const userId = req.params.userId;

    try {
        const trades = await Trade.find({ userId: userId });
        const tradeOffers = [];
        const associatedTrades = [];

        for (const trade of trades) {
            const offers = await Offer.find({ _id: { $in: trade.offers } });
            tradeOffers.push({ trade, offers });
        }

        const offers = await Offer.find({ userId: userId });
        for (const offer of offers) {
            const trade = await Trade.findOne({ _id: offer.tradeId });
            associatedTrades.push({ offer, trade });
        }

        const combinedData = {
            tradeOffers: tradeOffers,
            associatedTrades: associatedTrades,
        };

        res.json(combinedData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

router.post('/newoffer', async(req, res) => {
    const newOffer = req.body;

    try {
        const offerDocument = new Offer(newOffer);
        await offerDocument.save();

        const offerId = offerDocument._id;
        const userId = newOffer.userId;
        const tradeId = newOffer.tradeId;

        await User.findByIdAndUpdate(userId, { $push: { createdOffers: offerId } });
        await Trade.findByIdAndUpdate(tradeId, { $push: { offers: offerId }});
    } catch (error) {
        console.error('Error saving offer to MongoDb:', error);
        res.status(500).end('Internal Server Error');
    }

})

async function updateOffer(request, response, next) {
    const offerId = request.params._id;
    const offerUpdate = request.body.status;

    try {
        const newStatus = offerUpdate.status;
        const updatedOffer = await Offer.findByIdAndUpdate(offerId, { status: newStatus });

        if (!updatedOffer) {
            return response.status(404).json({ message: 'Offer not found' });
        }

        sendEventsToAll(updatedOffer);

        return response.status(200).json({ message: 'Offer updated successfully', updatedOffer });
    } catch (error) {
        return response.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

router.post('/update/:_id', updateOffer);

// router.post('/update/:_id', async(req, res) => {
//     const id = req.params._id;
//     const newStatus = req.body.status;
//
//     try {
//         const updatedOffer = await Offer.findByIdAndUpdate(id, { status: newStatus });
//
//         if (!updatedOffer) {
//             return res.status(404).json({ message: 'Offer not found' });
//         }
//
//         return res.status(200).json({ message: 'Offer updated successfully', updatedOffer });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// })

module.exports = router;