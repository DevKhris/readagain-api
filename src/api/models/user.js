const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const config = require('./../config/config').get(process.env.NODE_ENV);
const salt=16;

const userSchema = mongoose.Schema({
	username:{
		type: String,
		required: true,
		maxlength: 100,
		unique: 1
	},
	email:{
		type: String,
		required: true,
		trim: true,
		unique: 1
	},
	password:{
		type: String,
		required: true,
		minlength: 8
	},
	confirm:{
		type: String,
		required: true,
		minlength: 8
	},
	token:{
		type: String
	}
});

// Method to hash password if user was modified
userSchema.pre('save', function(next) {
	// declaring this as instance for user
	let user = this;

	// check if user has been modified
	if(user.isModified('password')){
		// Generate salt via Bcrypt
		bcrypt.genSalt(salt,(err,salt) => {
			if(err) return next(err);
			// Hash password and store in model
			bcrypt.hash(user.password,salt,(err,hash) => {
				if(err) return next(err);
				// save hash to user
				user.password=hash;
				user.confirm=hash;
				next();
			})
		})
	} else {
		next();
	}
});

// Method to compare passwords (validation)
userSchema.methods.compare = function(password, callback) {
	bcrypt.compare(password,this.password, (err, isMatch) => {
		if(err) return callback(next);
		callback(null,isMatch);
	});
};

// Method to generate session token (jwt)
userSchema.methods.genToken = function(callback) {
	// declaring this as instance for user
	let user = this;
	let token = jwt.sign(user._id.toHexString(),config.API_SECRET);

	// save token to user model
	user.token = token;

	// save user to db
	user.save((err, user) => {
		if(err) return callback(err);
		callback(null,user);
	});
};

// Method to find by token
userSchema.statics.findByToken = function(token, callback) {
	// declaring this as instance for user
	let user = this;

	// verify token with SECRET 
	jwt.verify(token, config.API_SECRET, (err, decode) => {
		user.findOne({"_id": decode, "token":token}, (err, user) => {
			if (err) return callback(err);
			// return callback
			callback(null,user);
		});
	});
};

// Method to delete session token (logout, deauth)
userSchema.methods.deleteToken = function(token, callback) {
	// declaring this as instance for user
	let user = this;

	// unset token for user
	user.update({$unset : {token : 1}}, (err, user) => {
		if (err) return callback(err);
		// return callback
		callback(null,user);
	});
}

module.exports = mongoose.model('User', userSchema);