
const express = require('express');
const BookController = require('../controllers/bookController');

let api = express.Router();
let md_auth = require('../middlewares/auth');

api.get('/books/:id', md_auth.ensureAuth, BookController.getBookById);
api.get('/books', md_auth.ensureAuth, BookController.getAllBooksOrByBookshelf);
api.get('/book/mybooks', md_auth.ensureAuth, BookController.getLentBooksByUser);
api.post('/books/:id/lend', md_auth.ensureAuth, BookController.lendBook);
api.post('/books/:id/returnbook', md_auth.ensureAuth, BookController.returnBook);
module.exports = api;
