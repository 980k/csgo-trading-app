const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');

const app = express();

app.use(cors());

const jsonRouter = jsonServer.router('db.json'); // Replace 'db.json' with your JSON data file

// Middleware to serve JSON Server API under a specific route (e.g., '/api')
app.use('/api', jsonRouter);

// You can add additional Express middleware and routes here

const port = process.env.PORT || 4000; // You can specify a different port if needed

app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
});
