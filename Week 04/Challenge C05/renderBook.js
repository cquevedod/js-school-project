const fs = require("fs");
const fetch = require("node-fetch");
const mustache = require("mustache");

export function renderBooks() {
  fetch("/books.json")
    .then(resp => resp.json())
    .then(data => {
      data.bookShelf.forEach(book => {
        let rating = fillStars(book.averageRating);
        let source = document.getElementById("book-template").innerHTML;
        let fields = {
          title: book.title,
          publishedDate: book.publishedDate,
          authors: book.authors,
          pageCount: book.pageCount,
          description: book.description,
          averageRating: rating,
          thumbnail: book.thumbnail,
          isbn: book.isbn
        };
        $("#bookshelfbooks").append(mustache.render(source, fields));
      });
      textOverImage();
    })
    .catch(err => {});
}

function fillStars(starCount) {
  let starIcon = "";
  const numberStar = Math.floor(starCount);
  if (!starCount) {
    for (let i = 0; i < 5; i = i + 1) {
      starIcon += '<i class="far fa-star"></i>';
    }
  } else {
    for (let i = 0; i < numberStar; i = i + 1) {
      if (i !== 0) {
        starIcon += '<i class="fa fa-star"></i>';
      } else {
        starIcon = '<i class="fa fa-star"></i>';
      }
    }
    if (numberStar !== 5) {
      for (let i = 0; i < 5 - numberStar; i = i + 1) {
        starIcon += '<i class="far fa-star"></i>';
      }
    }
  }
  return starIcon;
}

function textOverImage() {
  var textOverImages = document.getElementsByClassName("onClickTextOverImage");
  var previousTextOverImage;
  for (var i = 0; i < textOverImages.length; i++) {
    textOverImages[i].onclick = function() {
      var classes = this.classList;
      if (classes.contains("show")) {
        classes.remove("show");
      } else {
        if (previousTextOverImage != null)
          previousTextOverImage.classList.remove("show");
        previousTextOverImage = this;
        classes.add("show");
      }
    };
  }
}

export function stopPropagation(event) {
  event.stopPropagation();
}
