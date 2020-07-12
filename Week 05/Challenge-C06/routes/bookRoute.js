
const express = require('express');
const BookController = require('../controllers/bookController');

const api = express.Router();
const auth = require('../middlewares/auth');

api.get('/books/:id', auth, BookController.getBookById);
api.get('/books', auth, BookController.getAllBooksOrByBookshelf);
api.get('/book/mybooks', auth, BookController.getLentBooksByUser);
api.post('/books/:id/lend', auth, BookController.lendBook);
api.post('/books/:id/returnbook', auth, BookController.returnBook);
// api.delete('books/:id', auth, BookController.deleteBook);
module.exports = api;
