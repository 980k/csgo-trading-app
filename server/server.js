const express = require('express');
const cors = require('cors');
const fs = require('fs');
const user = require("./routes/userRoutes");
const mongoose = require("mongoose");

const app = express();

const MONGOURI = "mongodb://accAdmin:accPswd123@localhost:27017/user_accounts";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/user", user);

const User = require("./schemas/User");

app.get('/status', (request, response) => response.json({clients: clients.length}));

const PORT = 4000;

let clients = [];

// app.listen(PORT, () => {
//     console.log(`Facts Events service listening at http://localhost:${PORT}`)
// })

mongoose.connect(MONGOURI)
    .then(() => {
        console.log("Connected to MDB");
        app.listen(PORT, () => {
            console.log(`Node is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

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

// users database CRUD methods
app.get("/user", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve users" });
    }
});

app.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user" });
    }
});