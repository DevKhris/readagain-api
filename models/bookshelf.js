const mongoose = require('mongoose');

const booksShelfSchema = mongoose.Schema({
	id : {
		type: Int,
		unique: 1
	},

	userId : {
		type: Int,
		unique: 1
	},
	books : {
		count: [],
	},
	count: {
		type: Int
	},
	completed: {
		type: Boolean
	},
});

module.exports = mongoose.model('BookShelf', booksSchema);