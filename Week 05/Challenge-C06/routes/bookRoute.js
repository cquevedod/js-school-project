"use strict";

const express = require("express");
const BookController = require("../controllers/bookController");

let api = express.Router();
let md_auth = require("../middlewares/auth");

api.get("/book/:id", md_auth.ensureAuth,  BookController.getBook);
api.get("/books/all", md_auth.ensureAuth, BookController.getAllBooksOrByBookshelf);
api.get("/books/:bookShelf", md_auth.ensureAuth, BookController.getAllBooksOrByBookshelf); //filter books by Bookshelf
api.get("/book/:id/lend", md_auth.ensureAuth, BookController.lendBook);
module.exports = api;
