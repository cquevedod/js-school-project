const fs = require("fs");
const fetch = require("node-fetch");

const apiurl = "https://www.googleapis.com/books/v1/volumes?q=subject:";

let topics = ["FANTASY", "DRAMA"];

function concatenate(url, ...themes) {
  return themes.map(element => `${url}${element}`);
}

let urls = concatenate(apiurl, ...topics);
let bookSet = {
  bookShelf: []
};

for (let url of urls) {
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      data.items.forEach(book => {
        if (!data.items) return;
        bookSet.bookShelf.push({
          title: book.volumeInfo.title,
          publishedDate: book.volumeInfo.publishedDate.substr(0, 4),
          authors: book.volumeInfo.authors,
          pageCount: book.volumeInfo.pageCount,
          description: book.volumeInfo.description,
          averageRating: book.volumeInfo.averageRating,
          thumbnail: book.volumeInfo.imageLinks.thumbnail,
          isbn: book.volumeInfo.industryIdentifiers
        });
        let info = JSON.stringify(bookSet, null, 2);
        fs.writeFileSync("./books.json", info, err => {
          if (err) throw err;
          console.log("Data written into a file");
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
}
