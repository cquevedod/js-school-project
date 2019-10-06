"use strict";

const mongoose = require("mongoose");
const fs = require("fs");
const Books = require("./models/bookModel");

mongoose
  .connect("mongodb://localhost:27017/bookInfo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("☺"))
  .catch(err => console.error("Error trying to connect", err));

async function getDataFromJSON() {
  const books = await JSON.parse(fs.readFileSync("./books.json", "utf8"));
  return books;
}

function populateDB(req, res) {
  getDataFromJSON()
    .then(data => {
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
