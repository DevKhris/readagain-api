const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: 1,
  },

  title: {
    type: String,
    maxlength: 255,
  },
  author: {
    type: String,
    maxlength: 30,
  },
  image: {
    type: String,
  },
  year: {
    type: Date,
  },
  status: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Book", bookSchema);
