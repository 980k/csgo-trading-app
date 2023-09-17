const express = require('express');
const Trade = require("../schemas/Trade");
const User = require('../schemas/User');
const Offer = require("../schemas/Offer");

const router = express.Router();

let clients = [];

router.get('/status', (request, response) => response.json({ clients: clients.length }));

router.get('/api/trades', eventsHandler);

async function eventsHandler(request, response, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };

    try {
        const tradeData = await Trade.find({}).lean().exec();

        const tradeEventData = `data: ${JSON.stringify(tradeData)}\n\n`;

        response.writeHead(200, headers);
        response.write(tradeEventData);

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

router.get('/api/trades/:_id', async(req, res) => {
    const id = req.params._id;

    try {
        const trade = await Trade.find({_id: id});
        res.json(trade);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data.'})
    }
})

function sendEventsToAll(newData) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newData)}\n\n`))
}

router.post('/api/trades', addTrade);

async function addTrade(request, response, next) {
    const newTrade = request.body;

    try {
        const tradeDocument = new Trade(newTrade);
        const savedTrade = await tradeDocument.save();

        const tradeId = savedTrade._id;

        const userId = newTrade.userId;

        await User.findByIdAndUpdate(userId, { $push: { createdTrades: tradeId } });

        // Fetch the entire dataset from the trades collection
        const entireDataset = await Trade.find({});

        // Send the entire dataset as an SSE event
        sendEventsToAll(entireDataset);

        response.json(savedTrade);
    } catch (error) {
        console.error('Error saving trade to MongoDB:', error);
        response.status(500).end('Internal Server Error');
    }
}

router.post('/api/trades/:_id', updateTrade);

async function updateTrade(request, response, next) {
    const tradeId = request.params._id;
    const tradeUpdate = request.body;

    try {
        const offerId = tradeUpdate.acceptedOffer;
        const newTradeStatus = tradeUpdate.tradeStatus;

        const updatedTrade = await Trade.findByIdAndUpdate(tradeId, { acceptedOffer: offerId, status: newTradeStatus }, { new: true });

        if (!updatedTrade) {
            return response.status(404).json({ message: 'Trade or Offer not found.' });
        }

        // Fetch the entire dataset from the trades collection
        const entireDataset = await Trade.find({});

        // Send the entire dataset as an SSE event
        sendEventsToAll(entireDataset);

        return response.status(200).json({ message: 'Trade and Offer updated successfully', updatedTrade });
    } catch (error) {
        return response.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = router;