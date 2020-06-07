

const fs = require('fs');
const Books = require('./models/bookModel');

async function getDataFromJSON() {
  const books = await JSON
    .parse(fs.readFileSync('./books.json', 'utf8'));
  return books;
}

function populateDB(req, res) {
  getDataFromJSON()
    .then(data => {
      data.books.forEach(book => {
      const newBook = new Books(book);
      newBook.save();
      });
    res.send('db populated with books info');
    })
    .catch(function(err) {
      console.log('error: ', err);
    });
}

module.exports = {
  populateDB
};
