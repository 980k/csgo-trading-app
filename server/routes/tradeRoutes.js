const express = require('express');
const Trade = require("../schemas/Trade");

const router = express.Router();

// Initialize the clients array within the scope of tradeRoutes.js
let clients = [];

router.get('/status', (request, response) => response.json({ clients: clients.length }));

router.get('/api/trades', eventsHandler);

router.post('/api/trades', addTrade);

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

function sendEventsToAll(newTrade) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newTrade)}\n\n`))
}

async function addTrade(request, response, next) {
    const newTrade = request.body;

    try {
        // Assuming "Trade" is a Mongoose model, create a new trade document and save it to MongoDB
        const tradeDocument = new Trade(newTrade);
        await tradeDocument.save();

        response.json(newTrade);
        sendEventsToAll(newTrade);
    } catch (error) {
        console.error('Error saving trade to MongoDB:', error);
        response.status(500).end('Internal Server Error');
    }
}

module.exports = router;
