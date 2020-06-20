const User = require('./userModel');

const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let BookSchema = Schema({
  id: {
    type: String,
    unique: true
  },
  title: String,
  publishedDate: String,
  author: String,
  pageCount: Number,
  description: String,
  rating: Number,
  bookShelf: {
    type: String,
    enum: ['Cartagena', 'Medellin', 'Quito', 'Digital']
  },
  isLent: Boolean,
  returnDate: {
    type: Date,
    trim: true,
  },
  isbn: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: function () { return this.isLent; },
    ref: 'User'
  }
});

module.exports = mongoose.model('Book', BookSchema);
