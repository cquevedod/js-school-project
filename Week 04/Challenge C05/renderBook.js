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
        <i class="fas fa-caret-left arrow"></i>
        <div class="bookCompleteInfo">
            <p class="titleC" style="margin:1% 0;">{{title}}</p>
            <p class="authC" style="margin:1% 0;">Novel by<span id="color-word">
            {{authors}}</span></p>
            <p class="pagesC">{{pageCount}} pages</p>
            <p class="itemTitle">SUMMARY</p>
            <article style="margin:5% 0;">
            {{description}}
            </article>
            <p class="itemTitle" style="margin:1% 0;">RATING</p>
            <div class="star-rating">
                <i class="fa fa-fw fa-star"></i>
                <i class="fa fa-fw fa-star"></i>
                <i class="fa fa-fw fa-star"></i>
                <i class="fa fa-fw fa-star"></i>
                <i class="far fa-fw fa-star"></i>
            </div>
            <p style="margin:6% 0;"></p>
            <p class="recommend" style="margin:1% 0;">RECOMMENDED BY</p>
            <div class="recommended">
                <img src="assets/img/user3.png">
                <img src="assets/img/user2.png">
                <img src="assets/img/user.png">
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

  textOverImage(); 
  })
  .catch(err => {
    
  })
}

export function textOverImage() {
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
  }
}

}

export function stopPropagation(event){
  event.stopPropagation();
}