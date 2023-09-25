const express = require('express');
const auth = require("../middleware/auth");
const Trade = require('../schemas/Trade');
const Offer = require('../schemas/Offer');
const User = require("../schemas/User");

const router = express.Router();

let offerClients = [];

router.get('/all', offerEventsHandler);

async function offerEventsHandler(request, response, next) {
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

        const offerClientId = Date.now();

        const newOfferClient = {
            id: offerClientId,
            response
        };

        offerClients.push(newOfferClient);

        request.on('close', () => {
            console.log(`${offerClientId} Connection closed`);
            offerClients = offerClients.filter(offerClient => offerClient.id !== offerClientId);
        });
    } catch (error) {
        console.error(error);
        response.status(500).end();
    }
}

function sendEventsToAll(newOffer) {
    offerClients.forEach(offerClient => offerClient.response.write(`data: ${JSON.stringify(newOffer)}\n\n`))
}

router.get('/:userId', async(req, res) => {
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

router.post('/new', auth, async(req, res) => {
    const newOffer = req.body;

    try {
        const offerDocument = new Offer(newOffer);
        await offerDocument.save();

        const offerId = offerDocument._id;
        const userId = newOffer.userId;
        const tradeId = newOffer.tradeId;

        await User.findByIdAndUpdate(userId, { $push: { createdOffers: offerId } });
        await Trade.findByIdAndUpdate(tradeId, { $push: { offers: offerId }});

        res.status(201).json({ message: 'Offer created successfully' });
    } catch (error) {
        console.error('Error saving offer to MongoDb:', error);
        res.status(500).end('Internal Server Error');
    }
});

router.post('/update/:_id', auth, updateOffer);

async function updateOffer(request, response, next) {
    const offerId = request.params._id;
    const offerUpdate = request.body;

    try {
        const newStatus = offerUpdate.status;

        let updatedOffer;

        if(newStatus === "accepted") {
            const newAcceptedAt = offerUpdate.acceptedAt;
            updatedOffer = await Offer.findByIdAndUpdate(offerId, {
                status: newStatus,
                acceptedAt: newAcceptedAt
            }, { new: true });
        } else if(newStatus === "declined") {
            updatedOffer = await Offer.findByIdAndUpdate(offerId, {
                status: newStatus
            }, { new: true });
        }

        if (!updatedOffer) {
            return response.status(404).json({ message: 'Offer not found' });
        }

        sendEventsToAll(updatedOffer);

        return response.status(200).json({ message: 'Offer updated successfully', updatedOffer });
    } catch (error) {
        return response.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = router;