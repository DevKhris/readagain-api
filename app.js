const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const db = require('./config/config').get(process.env.NODE_ENV);

// models
const User = require('./models/user');
const Books = require('./models/books');
const BookShelf = require('./models/bookshelf');
const Catalog = require('./models/catalog');

// Init
const app = express();

// App Config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Enviroment Config

// Database Config
mongoose.Promise = global.Promise;
mongoose.connect(db.DATABASE,{ 
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useFindAndModify:false,
	useCreateIndex: true
	},function(err){
	if(err) console.log(`[Error]: ${err}`);
	console.log("[+] Database Connected");
});

// Server Config
const host = process.env.API_HOST;
const port = process.env.API_PORT;

// Middlewares
// middleware for logging petitions
app.use((req, res, next) => {
	console.log('[Log] ' + req.method + '' + req.path + ' - ' + req.ip);
	next();
});
//// Auth
const { auth } = require('./middlewares/auth');

// Routes
app.get('/', (req, res) => {
	res.status(200).send('Welcome to ReadAgain API, please login');
});

app.get('/api/bookshelf/get/:user', (req, res) => {
	res.send('Bookshelf Example');
});

app.get('/api/catalog', (req, res) => {
	 Catalog.find({}, function(err, catalog) {
		res.status(200).send(catalog);	
	});
});

app.post('/api/bookshelf/add', (req, res) => {
	res.send('Book Added');
});

app.path('/api/bookshelf/update', (req, res) => {
	res.send('Book Updated');
});

app.delete('/api/bookshelf/:id/delete', (req, res) => {
	res.send('Book Deleted');
});

// Auth routes
// 
// adding new user to db
app.post('/api/register', (req, res) => {
	// define new user from request body
	const newUser = new User(req.body);

	// verify if passwords are not equal
	if(newUser.password != newUser.confirm)
	{
		// send json with error message and code 400
		res.status(400).json({message: "Passwords don't match"});
	}

	// search is user already exist
	User.findOne(
		{
			username: newUser.username,
			email: newUser.email
		},
		(err, user) => {
			// if user exist send error message
			if(user)
			{
				// return response with error message and code 400
				return res.status(400).json({
					auth: false,
					message: "This user already exists"
				});
			}

			// save user to db
			newUser.save((err, prop) => {
				if(err)
				{
					// log error to console
					console.log(err);
					// return response with error message and code 400
					return res.status(400).json({ success: false});
				}

				// return response with
				res.status(200).json({
					success: true,
					user: prop
				});
		});
	}); 
});


// Server
app.listen(port);
console.log(`[+] Server running at http://${host}:${port}/`);