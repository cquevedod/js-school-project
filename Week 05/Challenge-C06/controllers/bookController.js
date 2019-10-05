"use strict";

const msg = require("./statusMsg");
const Book = require("../models/bookModel");

function getBookById(req, res) {
  const bookId = req.params.id;

  const query = Book.find({ id: bookId }).exec();
  query
    .then(data => {
      console.log("id book: " + data.id);
      if (!data.length) {
        res.status(404).send(msg.notFound("Book doesn't exists"));
        return;
      }
      res.send(msg.ok(data));
    })
    .catch(function(err) {
      console.log("error: ", err);
    });
}

function getAllBooksOrByBookshelf(req, res) {
  const location = req.params.bookShelf;
  if (location) {
    const QUERY = Book.find({ bookShelf: location }).exec();
    QUERY.then(data => {
      if (!data.length) {
        res
          .status(400)
          .send(
            msg.badRequest(
              "Invalid BookShelf. Please use one this parameters: Cartagena, Quito, Medellin or Digital"
            )
          );
        return;
      }
      res.send(msg.ok(data, "Books by BookShelf!"));
    }).catch(function(err) {
      console.log("error: ", err);
    });
  } else {
    const query = Book.find().exec();
    query
      .then(data => {
        if (!data.length) {
          res.status(204).send(msg.noContent("No books found in the database"));
        }
        res.send(msg.ok(data, "All Books!"));
      })
      .catch(function(err) {
        console.log("error: ", err);
      });
  }
}

function lendBook(req, res) {
  const bookId = req.params.id;
  const query = Book.find({ id: bookId }).exec();
  query
    .then(data => {
      if (!data.length) {
        res.status(404).send(msg.notFound("Item doesn't exists"));
        return;
      }
      console.log(data[0].bookShelf);
      if (data[0].bookShelf == "Digital") {
        Book.updateOne({ id: bookId }, { $set: { isLent: false } }).exec();
        console.log("transformed");
        res
          .status(401)
          .send(
            msg.unAuthorized(
              "Is a digital book, therefore it can’t be lent",
              data
            )
          );
      } else {
        if (data[0].isLent) {
          res
            .status(401)
            .send(msg.alreadyLentOrNot(data, "This book is already Lent!"));
        } else {
          console.log(data);
          Book.updateOne({ id: bookId }, { $set: { isLent: true } }).exec();
          res.status(200).send(msg.okIsLentOrReturned(data, "Book lent!"));
        }
      }
    })
    .catch(function(err) {
      console.log("error: ", err);
    });
}

function returnBook(req, res) {
  const bookId = req.params.id;
  const query = Book.find({ id: bookId }).exec();
  query
    .then(data => {
      if (!data.length) {
        res.status(404).send(msg.notFound("Book doesn't exists"));
        return;
      }
      console.log(data[0].bookShelf);
      if (data[0].bookShelf == "Digital") {
        res
          .status(401)
          .send(
            msg.unAuthorized(
              "the book is digital, so never was lent, therefore you can't return it",
              data
            )
          );
      } else {
        if (data[0].isLent) {
          Book.updateOne({ id: bookId }, { $set: { isLent: false } }).exec();
          res.status(200).send(msg.okIsLentOrReturned(data, "Book returned!"));
        } else {
          console.log(data);
          res
            .status(401)
            .send(
              msg.alreadyLentOrNot(
                data,
                "Book is not lent, therefore you can't returned!"
              )
            );
        }
      }
    })
    .catch(function(err) {
      console.log("error: ", err);
    });
}

module.exports = {
  getBookById,
  getAllBooksOrByBookshelf,
  lendBook,
  returnBook
};
