
const _ = require('lodash');
const msg = require('./statusMsg');
const Book = require('../models/bookModel');
const verify = require('../services/jwt');

async function getBookById(req, res, next) {
    
    const bookId = req.params.id;
    const query = await Book.find({ id: bookId });

    if (!query.length) return res.status(404).send(msg.notFound('Book does not exist'));

    return res.send(msg.ok(query));

}

function getAllBooksOrByBookshelf(req, res) {
  
    const input = req.query.bookshelf;

  if (input) {
    const location = input[0].toUpperCase() + input.slice(1);
    const query = Book.find({ bookShelf: location });
    query.then(data => {
      if (!data.length) return res.status(400).send(msg.badRequest());
      return res.send(msg.ok(data, `${location} books`));
    })

  } else {
    const query = Book.find();
    query.then(data => {
      if (!data.length) return res.status(204).send(msg.noContent());
      return res.send(msg.ok(data, 'All Books!'));
    })
  }
    
  
}

function getLentBooksByUser(req, res) {
  const userId = req.user.id;
  console.log(userId)

  if (!userId) return res.status(500).send(msg.internalError('Error trying to get the books'));

  Book.find({ user: userId })
    .then(books => {
      console.log(books.length)
      if (!books) return res.status(500).send(msg.internalError('Error tryng to get the books'));
      return res.status(200).send(msg.ok(books, 'Books lent by you'));
    })
}

function lendBook(req, res) {
  const bookId = req.params.id;
  const { return_date } = req.body;
  // if (!validateDate(return_date))
  //   return res.status(400).send(msg.invalidLentDate());

  const query = Book.find({ id: bookId });
  const givenDate = new Date(return_date)
  const userId = req.user.id;

  if (!userId) return res.status(500).send(msg.internalError('Error trying to lent the book'));

  query.then(book => {
    if (!book.length) return res.status(404).send(msg.notFound('Item does not exist'));

    if (book[0].bookShelf == 'Digital') {
      Book.updateOne({ id: bookId },
        {
          $set: { isLent: false },
          $unset: {
            user: "",
            returnDate: ""
          }
        }
      ).exec();
      return res.status(401).send(msg.unAuthorized(book, 'You can not lend a Digital book!'));
    } else {
      if (book[0].isLent) return res.status(401).send(msg.alreadyLentOrNot(book, 'This book is already Lent!'));

      if (!validateDate(return_date)) return res.status(400).send(msg.invalidLentDate());

      Book.updateOne({ id: bookId },
        {
          $set: {
            isLent: true,
            returnDate: return_date,
            user: userId
          }
        }).exec();
      return res.status(200).send(msg.lentTheBook(book, 'Book lent!', return_date));
    }
  })
}

function returnBook(req, res) {
  const bookId = req.params.id;
  const userId = req.user.id;
  console.log(userId)

  if (!userId) return res.status(500).send(msg.internalError('Error trying to return the book'));
  Book.find({ id: bookId })
    .then(book => {
      if (!book.length) return res.status(404).send(msg.notFound('Item does not exist'));

      if (book[0].isLent && book[0].user != userId) return res.status(401).send(msg.alreadyLentOrNot(book, 'This book is already Lent by other user!'));

      if (!book[0].isLent) return res.status(404).send(msg.notFound('This book is not lent, so you can not return it'));

      Book.updateOne({ id: bookId },
        {
          $set: { isLent: false },
          $unset: {
            user: "",
            returnDate: ""
          }
        }
      ).exec();
      return res.status(200).send(msg.lentTheBook(book, 'Book returned!'));
    })
}

Date.prototype.isValid = function () {
  return this.getTime() === this.getTime();
};

function validateDate(date) {
  var datePattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  return datePattern.test(date);
} 

module.exports = {
  getBookById,
  getAllBooksOrByBookshelf,
  lendBook,
  getLentBooksByUser,
  returnBook
};
