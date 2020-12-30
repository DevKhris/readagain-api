const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');

// Enviroment Config

// Server Config
const app = express();
const host = process.env.API_HOST;
const port = process.env.API_PORT;

// Server
app.listen(port);
console.log(`Server running at http://${host}:${port}/`);

// Routes
app.get('/', (req,res) => {
	res.send('Welcome to ReadAgain API');
});