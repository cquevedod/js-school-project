"use strict";

const msg = require("./statusMsg");
const Book = require("../models/bookModel");

 function getBookById(req, res) {
  const bookId = req.params.id;

  const query = Book.find({ id: bookId }).exec();
  query
    .then(data => {
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
        res.status(400).send(msg.badRequest(
          'Invalid BookShelf. Please use one this parameters: Cartagena, Quito, Medellin or Digital'));
        return;
      }
      res.send(msg.ok(data, 'Books by BookShelf!'));

    }).catch(function(err) {
      console.log("error: ", err);
    });
  } else {
    const query = Book.find().exec();
    query
      .then(data => {
        if (!data.length) {
          res
            .status(204)
            .send(msg.noContent('No books found in the database'));
        }
        res.send(msg.ok(data, 'All Books!'));

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
        res.status(404).send(msg.notFound("Book doesn't exists"));
        return;
      }
      console.log(data[0].bookShelf);
      if (data[0].bookShelf == "Digital") {
        Book.updateOne({ id: bookId }, { $set: { isLent: false } }).exec();
        console.log("transformed")
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

function returnBook(req, res) {
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
          message: "the book is digital, so never was lent, therefore you can't return it",
          bookShelf: data[0].bookShelf
        };
        res.send(response);
      } else {
        if (data[0].isLent) {
          Book.updateOne({ id: bookId }, { $set: { isLent: false } }).exec();
          const response = {
            status: 200,
            message: "Book returned!",
            books: Book.find().exec()
          };
          res.send(response);

         
        } else {
          console.log(data);
          const response = {
            status: 200,
            message: "Book is not lent, therefore you cant returned!",
            
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
  getBookById,
  getAllBooksOrByBookshelf,
  lendBook,
  returnBook
};
