"use strict";

const path = require("path");
const fs = require("fs");

const Book = require("../models/bookModel");

async function getBook(req, res) {
  const bookId = req.params.id;

  const query = Book.find({ id: bookId }).exec();
  query
    .then(data => {
      if (!data.length) {
        res.status(404).send({ message: "Book doesn't exist" });
        return;
      }
      const response = {
        status: 200,
        items: Book.count({ id: bookId }).exec,
        books: data
      };
      res.send(response);
    })
    .catch(function(err) {
      console.log("error: ", err);
    });
}

async function getAllBooksOrByBookshelf(req, res) {
  const location = req.params.bookShelf;
  if (location) {
    const QUERY = Book.find({ bookShelf: location }).exec();
    QUERY.then(data => {
      if (!data.length) {
        res.status(404).send({
          message: `Invalid BookShelf. Please use one this parameters:
                                  Cartagena,
                                  Quito,
                                  Medellin,
                                  Digital`
        });
        return;
      }
      const response = {
        status: 200,
        message: "Books by BookShelf",
        books: data
      };
      res.send(response);
    }).catch(function(err) {
      console.log("error: ", err);
    });
  } else {
    const query = Book.find().exec();
    query
      .then(data => {
        if (!data.length) {
          res
            .status(404)
            .send({ message: 'Check the route, should be "books/all" ' });
        }
        const response = {
          status: 200,
          message: "All Books",
          books: data
        };
        res.send(response);
      })
      .catch(function(err) {
        console.log("error: ", err);
      });
  }
}

async function lendBook(req, res) {
  const bookId = req.params.id;
  const query = Book.find({ id: bookId }).exec();

  query
    .then(data => {
      if (!data.length) {
        res.status(404).send({ message: "Book doesn't exist" });
        return;
      }
      console.log(data[0].bookShelf);
      if (data[0].bookShelf == "Digital") {
        const response = {
          status: 401,
          message: "the book is digital, therefore it can’t be lent",
          bookShelf: data[0].bookShelf
        };
        res.send(response);
      } else {
        if (data[0].isLent) {
          const response = {
            status: 200,
            message: "This book is already Lent!",
            books: data
          };
          res.send(response);
        } else {
          console.log(data);
          // data[0].isLent = true;
          Book.updateOne({ id: bookId }, { $set: { isLent: true } }).exec();
          const response = {
            status: 200,
            message: "Book lent!",
            books: Book.find().exec()
          };
          res.send(response);
        }
      }
    })
    .catch(function(err) {
      console.log("error: ", err);
    });
}

module.exports = {
  getBook,
  getAllBooksOrByBookshelf,
  lendBook
};
