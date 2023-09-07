const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/status', (request, response) => response.json({clients: clients.length}));

const PORT = 4000;

let clients = [];

app.listen(PORT, () => {
    console.log(`Facts Events service listening at http://localhost:${PORT}`)
})

function eventsHandler(request, response, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };

    const data = fs.readFileSync('db.json', 'utf8');
    const jsonData = JSON.parse(data);
    const dataWrite = `data: ${JSON.stringify(jsonData)}\n\n`;

    response.writeHead(200, headers);
    response.write(dataWrite);

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
}

app.get('/api/trades', eventsHandler);
// ...

function sendEventsToAll(newTrade) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newTrade)}\n\n`))
}

async function addTrade(request, response, next) {
    const newTrade = request.body;

    try {
        // Read the existing data from db.json
        const existingData = await fs.promises.readFile('db.json', 'utf8');
        const existingTrades = JSON.parse(existingData);

        // Append the new trade to the existing trades
        existingTrades.push(newTrade);

        // Write the updated data back to db.json
        await fs.promises.writeFile('db.json', JSON.stringify(existingTrades, null, 2), 'utf8');

        response.json(newTrade);
        sendEventsToAll(newTrade);
    } catch (error) {
        console.error('Error reading/writing db.json:', error);
        response.status(500).end('Internal Server Error');
    }
}

app.post('/api/trades', addTrade);