
  const User = require('./userModel');

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookSchema = Schema({
  id: String,
  title: String,
  publishedDate: String,
  author: String,
  pageCount: Number,
  description: String,
  rating: Number,
  bookShelf: String,
  isLent: Boolean,
  returnDate: String,
  isbn: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Book', BookSchema);
