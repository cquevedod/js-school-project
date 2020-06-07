
const express = require('express');
const BookController = require('../controllers/bookController');

let api = express.Router();
let md_auth = require('../middlewares/auth');

api.get('/books/:id', md_auth.ensureAuth,  BookController.getBookById);
api.get('/books', md_auth.ensureAuth, BookController.getAllBooksOrByBookshelf);
api.post('/books/:id/lend', md_auth.ensureAuth, BookController.lendBook);
module.exports = api;
