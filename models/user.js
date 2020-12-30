const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);