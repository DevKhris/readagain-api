const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
	id : {
		type: Int,
		unique: 1
	},

	title : {
		type: String,
		maxlength: 255
	},
	author : {
		type: String,
		maxlength: 30
	},
	image: {
		type: String
	},
	year: {
		type: Int,
	},
	status: {
		type: Boolean
	}
});

module.exports = mongoose.model('Book', booksSchema);