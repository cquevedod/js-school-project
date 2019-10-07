"use strict";

const msg = require("./statusMsg");
const Book = require("../models/bookModel");

async function getBookById(req, res) {
  try {
    const bookId = req.params.id;
    const query = await Book.find({ id: bookId }).exec();
    if (!query.length) {
      return res
        .status(404)
        .send(msg.notFound("Book doesn't exist"));
    }
    return res.send(msg.ok(query));
  } catch (err) {
    console.log("error: ", err);
  }
}

function getAllBooksOrByBookshelf(req, res) {
  const input = req.query.bookshelf;
  if (input) {
    let location = input[0].toUpperCase() + input.slice(1);
    const query = Book.find({ bookShelf: location }).exec();
    query.then(data => {
      if (!data.length) {
        return res
           .status(400)
           .send(msg.badRequest());
      }
      return res
        .send(msg.ok(data, `${location} books`));
    }).catch(function(err) {
      console.log("error: ", err);
    });
  } else {
    const query = Book.find().exec();
    query.then(data => {
      if (!data.length) {
        return res
          .status(204)
          .send(msg.noContent());
      }
      return res
        .send(msg.ok(data, "All Books!"));
      })
      .catch(function(err) {
        console.log("error: ", err);
      });
  }
}

function lendBook(req, res) {
  const bookId = req.params.id;
  const body = req.body;
  const query = Book.find({ id: bookId }).exec();
  query.then(book => {
      if (!book.length) {
        res
          .status(404)
          .send(msg.notFound("Item doesn't exist"));
        return;
      }
      if (book[0].bookShelf == "Digital") {
        Book.updateOne({ id: bookId },
          { $set: { isLent: false }})
          .exec();
        return res
          .status(401)
          .send(msg.unAuthorized("You can't lend a Digital book!", book));
      } else {
        if (book[0].isLent) {
          res
            .status(401)
            .send(msg.alreadyLentOrNot(book, "This book is already Lent!"));
        } else {
          if(body.return_date) {
            Book.updateOne({ id: bookId },
              { $set: { isLent: true,
              returnDate: body.return_date}})
              .exec();
            res
              .status(200)
              .send(msg.lentTheBook(book, "Book lent!", body.return_date));
          } else {
            res
              .status(400)
              .send(msg.invalidLentDate());
          }
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
};
