"use strict";

const msg = require("./statusMsg");
const Book = require("../models/bookModel");

async function getBookById(req, res) {
  try {
    const bookId = req.params.id;
    const query = await Book.find({ id: bookId }).exec();
    if (!query.length) {
      return res.status(404).send(msg.notFound('Book doesn\'t exist'));
    }
    return res.status(200).send(msg.ok(query));
  } catch (err) {
    console.log("error: ", err);
  }
}

async function getAllBooksOrByBookshelf(req, res) {
  try {
    const input = req.query.bookshelf;
    if (input) {
      let location = input[0].toUpperCase() + input.slice(1);
      const query = await Book.find({ bookShelf: location }).exec();
      if (!query.length) {
        return res.status(400).send(msg.badRequest());        
      }
      return res.status(200).send(msg.ok(query, `${location} books`));      
    } else {
      const query = await Book.find().exec();
      if (!query.length) {
        return res.status(204).send(msg.noContent());
      }
      return res.status(200).send(msg.ok(query, 'All Books!'));     
    }
  } catch (error) {
    res.status(404).send(`error: ${error}`);
  }
}

async function lendBook (req, res) {
  try {
    const bookId = req.params.id;
    const body = req.body;
    const query = await Book.find({ id: bookId }).exec();
    if (!query.length) {
      return res.status(404).send(msg.notFound('Item doesn\'t exist'));
    }
    if (query[0].bookShelf == 'Digital') {
      Book.updateOne({ id: bookId }, { $set: { isLent: false }})
        .exec();
      return res.status(401)
        .send(msg.unAuthorized('You can\'t lend a Digital book!', query));  
    } else {
      if (query[0].isLent) {
        return res.status(401)
          .send(msg.alreadyLentOrNot(query, 'This book is already Lent!'));
      } else {
        if(body.return_date) {
          Book.updateOne({ id: bookId },{ $set: { isLent: true, returnDate: body.return_date}})
            .exec();
          return res.status(200)
            .send(msg.lentTheBook(query, 'Book lent!', body.return_date));
        } else {
          return res.status(400)
            .send(msg.invalidLentDate());
        }
      } 
    }
  } catch (error) {
    res.status(404).send(`error: ${error}`);
  }
}

module.exports = {
  getBookById,
  getAllBooksOrByBookshelf,
  lendBook,
};
