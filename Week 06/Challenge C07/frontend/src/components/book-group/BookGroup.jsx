
import React, { Component } from 'react';
// import './BookGroup.scss';
import Book from '../book/Book';
import './BookGroup.scss'

export default class BookGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booksItems: [],
    };
    this.params = {};
  }

  componentDidMount() {
    this.fetchBooks();
  }

   fetchBooks() {
    const { params } = this;
    const token = sessionStorage.getItem('token');
    if (!params.searchInput) delete params.searchInput;
    console.log(token);

    const headers = new Headers();
    headers.set('Authorization', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZDlkZjY5ZWRjMjk5MDA1NzRlNDBjNjYiLCJuYW1lIjoiQ2FybG9zIiwic3VybmFtZSI6IlEiLCJlbWFpbCI6ImNxQHVzZXIuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTU3MDYzMzQwMn0.fuHcJKNX4ze-meYWQRqiTpNBhig2TubsWdkl6Vs4Kz8`);
    const url = new URL('http://localhost:3977/api/books/');
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    fetch(url, {
      headers,
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        const bookElements = data.books.map((book) => (
            
        <Book
          title={book.title}
          author={book.author}
          publishedDate={book.publishedDate ? book.publishedDate.split('-')[0] : 'Not available'}
          description={book.description}
          averageRating={book.averageRating ? Math.round(book.averageRating) : 0}
          thumbnail={book.thumbnail}
          id={book.id}
          key={book.id}
          pageCount={`${book.pageCount}`}
        />
      ));


      this.setState({
        booksItems: bookElements,
      });
    });
  }

  render() {
    const { booksItems } = this.state;
    return (
      <div className="row">
        {booksItems}
      </div>
    );
  }
}
