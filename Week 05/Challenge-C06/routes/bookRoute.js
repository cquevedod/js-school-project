"use strict";

const express = require("express");
const BookController = require("../controllers/bookController");

let api = express.Router();
let md_auth = require("../middlewares/auth");

api.get("/book/:id", md_auth.ensureAuth,  BookController.getBookById);
api.get("/books/all", md_auth.ensureAuth, BookController.getAllBooksOrByBookshelf);
api.get("/bookshelf/:bookShelf", md_auth.ensureAuth, BookController.getAllBooksOrByBookshelf); //filter books by Bookshelf
api.post("/book/:id/lend", md_auth.ensureAuth, BookController.lendBook);
api.post("/book/:id/return", md_auth.ensureAuth, BookController.returnBook);
module.exports = api;
