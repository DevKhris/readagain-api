const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const db=require('./config/config').get(process.env.NODE_ENV);

// Init
const app = express();

// App Config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

// Enviroment Config

// Database Config
mongoose.Promise = global.Promise;
mongoose.connect(db.DATABASE,{ useNewUrlParser: true, useUnifiedTopology:true},function(err){
	if(err) console.log(`[Error]: ${err}`);
	console.log("Database Connected");
});

// Server Config
const host = process.env.API_HOST;
const port = process.env.API_PORT;

// Routes
app.get('/', (req, res) => {
	res.status(200).send('Welcome to ReadAgain API, please login');
});

app.get('/get', (req, res) => {
	res.send('Book Example');
});

app.post('/add', (req, res) => {
	res.send('Book Added');
});

app.path('/update', (req, res) => {
	res.send('Book Updated');
});

app.delete('/:id/delete', (req, res) => {
	res.send('Book Deleted');
});

// Server
app.listen(port);
console.log(`[+] Server running at http://${host}:${port}/`);