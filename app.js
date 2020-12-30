const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/config').get(process.env.NODE_ENV);

// models
const User = require('./models/user');
const Books = require('./models/user');
const Catalog = require('./models/user');

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
	console.log("[+] Database Connected");
});

// Server Config
const host = process.env.API_HOST;
const port = process.env.API_PORT;

// Middlewares
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
	res.send('Catalog Example');
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

app.post('/api/login', (req, res) => {
	// get token from cookies in request
	let token = req.cookies.auth;

	// find user by token
	User.findByToken(token, function(err, user) {
		if(err) return res(err);
		// if is already logged return error message
		if(user) {
			return res.status(400).json({
				error: true,
				message: "This user is already logged in"
			});
		}
		else {
			// find user by username or mail
			User.findOne({
			username: req.body.username 
			} || {
				email: req.body.email
			},
			(err, user) => {
				// if user is not found return error message
				if(!user) 
				{
					return res.json({
						isAuth: false,
						message: "Auth failed, username or email not found"
					});
				}

				// compare user password with records
				user.compare(req.body.password, (err, isMatch) => {
					// if user password not match return error message
					if(!isMatch) 
					{
						return res.json({
							isAuth: false,
							message: "Password doesn't match"
						});
					}
				});

				// if login ws successfull generate token for session prevalence
				user.genToken((err, user) => {
					if(err)
					{
						return res.status(400).send(err);
					}
					// sets token to cookie and sends it like json
					res.cookie('auth', user.token).json({
						isAuth: true,
						id: user._id,
						email: user.email
					});
				});
			});
		}
	});
});

app.get('/api/:user/profile', auth, (req, res) => {
	res.json({
		isAuth: true,
		id: req.user._id,
		username: req.user.username,
		email: req.user.email
	})
});

app.get('/api/logout', auth, (req, res) => {
	req.user.deleteToken(req.token, (err, user) => {
		if(err) return res.status(400).send(err);
		res.status(200).send('user has been logged out');
	});
});

// Server
app.listen(port);
console.log(`[+] Server running at http://${host}:${port}/`);