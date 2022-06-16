const mongoose = require("mongoose");

const catalogSchema = mongoose.Schema({
  author: {
    type: String,
  },
  country: {
    type: String,
  },
  imageLink: {
    type: String,
  },
  language: {
    type: String,
  },
  link: {
    type: String,
  },
  pages: {
    type: Number,
  },
  title: {
    type: String,
  },
  year: {
    type: String,
  },
});

module.exports = mongoose.model("Catalog", catalogSchema);
