const mongoose = require('mongoose');

const booksShelfSchema = mongoose.Schema({
	id : {
		type: Number,
		unique: 1
	},

	userId : {
		type: Number,
		unique: 1
	},
	books : {
		count: [],
	},
	count: {
		type: Number
	},
	completed: {
		type: Boolean
	},
});

module.exports = mongoose.model('BookShelf', booksShelfSchema);