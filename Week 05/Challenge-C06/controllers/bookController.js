
const msg = require('./statusMsg');
const Book = require('../models/bookModel');
let verify = require('../services/jwt');

async function getBookById(req, res) {
  try {
    const bookId = req.params.id;
    const query = await Book.find({ id: bookId });
    
    if (!query.length) return res.status(404).send(msg.notFound('Book does not exist'));

    return res.send(msg.ok(query));
  } catch (err) {
    console.log('error: ', err);
  }
}



function getAllBooksOrByBookshelf(req, res) {
  const input = req.query.bookshelf;

  if (input) {
    let location = input[0].toUpperCase() + input.slice(1);
    const query = Book.find({ bookShelf: location });
    query.then(data => {
      if (!data.length) return res.status(400).send(msg.badRequest());
      return res.send(msg.ok(data, `${location} books`));
    }).catch(function(err) {
      console.log('error: ', err);
    });

  } else {
    const query = Book.find();
    query.then(data => {
      if (!data.length) return res.status(204).send(msg.noContent());
      return res.send(msg.ok(data, 'All Books!'));
      })
      .catch(function(err) {
        console.log('error: ', err);
      });
  }
}

function getLentBooksByUser(req, res) {
  const token = req.headers.authorization;
  let tokenDecoded = verify.decodeToken(token);
  let userId = tokenDecoded.sub;

  Book.find({ user: userId })
    .then(books => {
      console.log(books.length)
      if (!books) return res.status(500).send(msg.internalError('Error tryng to get the books'));
      return res.status(200).send(msg.ok(books, 'Books lent by you'));
    }).catch(function(err) {
      console.log('error: ', err);
    });
}

function lendBook(req, res) {
  const bookId = req.params.id;
  const { return_date } = req.body;
  // if (!validateDate(return_date))
  //   return res.status(400).send(msg.invalidLentDate());

  const query = Book.find({ id: bookId });
  const givenDate = new Date(return_date)

  const token = req.headers.authorization;
  console.log(token);
  console.log(verify.decodeToken(token));
  let tokenDecoded = verify.decodeToken(token);
  let userId = tokenDecoded.sub;

  query.then(book => {
      if (!book.length) 
        return res.status(404).send(msg.notFound('Item does not exist'));

      if (book[0].bookShelf == 'Digital') {
        Book.updateOne({ id: bookId },
          { $set: { isLent: false },
            $unset: { user: "",
              returnDate: ""
            }
          }
        ).exec();
        return res.status(401).send(msg.unAuthorized(book, 'You can not lend a Digital book!'));
      } else {
        if (book[0].isLent) {
         return res.status(401).send(msg.alreadyLentOrNot(book, 'This book is already Lent!'));
        } else {
          if (validateDate(return_date)) {
            Book.updateOne({ id: bookId },
              { $set: { isLent: true,
              returnDate: return_date,
              user: userId
              }}).exec();
            return res.status(200).send(msg.lentTheBook(book, 'Book lent!', return_date));
          } else {
            return res.status(400).send(msg.invalidLentDate());
          }
        }
      }
    })
    .catch(function(err) {
      console.log('error: ', err);
    });
}

function returnBook (req, res) {
  const bookId = req.params.id;
  let tokenDecoded = verify.decodeToken(req.headers.authorization);
  let userId = tokenDecoded.sub;
  console.log(userId)
  Book.find( { id: bookId } )
  .then(book => {
    if (!book.length) return res.status(404).send(msg.notFound('Item does not exist'));
    if (book[0].isLent && book[0].user != userId) return res.status(401).send(msg.alreadyLentOrNot(book, 'This book is already Lent by other user!') );
    if(!book[0].isLent) return res.status(404).send(msg.notFound('This book is not lent, so you can not return it'));

    Book.updateOne( { id: bookId },
    { $set: { isLent: false }, 
      $unset: { user: "",
        returnDate: ""
      } 
    }
    ).exec();
    return res.status(200).send(msg.lentTheBook(book, 'Book returned!'));    
  })
  .catch(function(err) {
    console.log('error: ', err);
  })


}

Date.prototype.isValid = function () {
  return this.getTime() === this.getTime();
};

function validateDate(date){      
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
