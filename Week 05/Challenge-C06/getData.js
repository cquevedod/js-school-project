"use strict";

const mongoose = require("mongoose");
const port = process.env.PORT || 3977;
const fs = require("fs");
const Books = require("./models/bookModel");

mongoose
  .connect("mongodb://localhost:27017/bookInfo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("connection succesful!"))
  .catch(err => console.error("Error trying to connect", err));

 function getDataFromJSON() {
  const books = JSON.parse(fs.readFileSync("./books.json", "utf8"));
  return books;
}

 function populateDB(req, res) {
  getDataFromJSON().then(data => {
    data.books.forEach(book => {
      const newBook = new Books(book);
      newBook.save();
    });
    res.send("db populated");
  })
  .catch(function(err) {
    console.log("error: ", err);
  });
}

module.exports = {
  populateDB
};
