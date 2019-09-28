const  fs =  require('fs');
const fetch = require('node-fetch');
const mustache = require('mustache');

export function renderBooks() {

 fetch('/books.json')
  .then((resp) => resp.json())
  .then(data => {
    let books = data.bookShelf;
    
        $.each(books, function(index, item){
            let html= `
            <div class="column">
            <div class="cover">
              <div class="onClickTextOverImage" style="background-image:url({{thumbnail}}); background-repeat: no-repeat;">
                <div class="info-over-cover">
                  <img src="img/rate-book/heart.png" class="icon-up-left">
                  <img src="img/rate-book/opened-book.png" class="icon-center">
                  <img src="img/rate-book/bookmark.png" class="icon-up-right">
                  <p class="rating-book">rate this book</p>
                  <div class="star-rating-book">
                    <i class="fa fa-fw fa-star"></i>
                    <i class="fa fa-fw fa-star"></i>
                    <i class="fa fa-fw fa-star"></i>
                    <i class="fa fa-fw fa-star"></i>
                    <i class="far fa-fw fa-star"></i>
                  </div>
                </div>
              </div>
              <div class="cover-info">
                <p class="book-title">{{title}}</p>
                <p class="book-author">{{authors}}</p>
                <div class="star-rating">
                  <i class="fa fa-fw fa-star" id="one"></i>
                  <i class="fa fa-fw fa-star" id="two"></i>
                  <i class="fa fa-fw fa-star" id="three"></i>
                  <i class="fa fa-fw fa-star" id="four"></i>
                  <i class="far fa-fw fa-star" id="five"></i>
                </div>
              </div>
            </div>
          </div>`;

    $('#bookshelfbooks').append(mustache.render(html, item));
        }); 
    
  })
  .catch(err => {
    
  })
}
