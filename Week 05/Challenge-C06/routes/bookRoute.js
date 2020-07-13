
const express = require('express');
const BookController = require('../controllers/bookController');
const api = express.Router();
const auth = require('../middlewares/auth');
const async = require('../middlewares/async');
const catchError = require('../middlewares/catch');


api.get('/books/:id', auth, async(BookController.getBookById));
api.get('/books', auth, catchError(BookController.getAllBooksOrByBookshelf));
api.get('/book/mybooks', auth, catchError(BookController.getLentBooksByUser));
api.post('/books/:id/lend', auth, catchError(BookController.lendBook));
api.post('/books/:id/returnbook', auth, catchError(BookController.returnBook));
// api.delete('books/:id', auth, BookController.deleteBook);
module.exports = api;
