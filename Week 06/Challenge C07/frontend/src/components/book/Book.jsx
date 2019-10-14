import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Book.scss';

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarked: false,
      liked: false,
      userRating: 0,
      openedSeethroughOptions: false,
      openedDetails: false,
      openedLendOptions: false,
    };

    this.clickBookmarkHandler = this.clickBookmarkHandler.bind(this);
    this.clickDescriptionHandler = this.clickDescriptionHandler.bind(this);
    this.clickLikeHandler = this.clickLikeHandler.bind(this);
    this.clickRatingHandler = this.clickRatingHandler.bind(this);
    this.clickSeethroughHandler = this.clickSeethroughHandler.bind(this);
    this.clickLendButtonHandler = this.clickLendButtonHandler.bind(this);
  }

  clickLendButtonHandler(event) {
    event.stopPropagation();
    const { openedLendOptions } = this.state;
    this.setState({
      openedLendOptions: !openedLendOptions,
    });
  }

  clickSeethroughHandler(event) {
    event.stopPropagation();
    event.preventDefault();
    const { openedSeethroughOptions } = this.state;
    this.setState({
      openedSeethroughOptions: !openedSeethroughOptions,
    });
  }

  clickBookmarkHandler(event) {
    event.stopPropagation();
    const { bookmarked } = this.state;
    this.setState({
      bookmarked: !bookmarked,
    });
  }

  clickLikeHandler(event) {
    event.stopPropagation();
    const { liked } = this.state;
    this.setState({
      liked: !liked,
    });
  }

  clickDescriptionHandler(event) {
    event.stopPropagation();
    event.preventDefault();
    const { openedDetails } = this.state;
    this.setState({
      openedDetails: !openedDetails,
    });
  }

  clickRatingHandler(event, rating) {
    event.stopPropagation();
    this.setState({
      userRating: rating,
    });
  }

  render() {
    const {
      id,
      title,
      publishedDate,
      author,
      pageCount,
      description,
      averageRating,
      thumbnail,
    } = this.props;

    const {
      bookmarked,
      liked,
      userRating,
      openedDetails,
      openedSeethroughOptions,
      openedLendOptions,
    } = this.state;

    const styles = {
      backgroundImage: `url(${thumbnail})`
    };

    return (

      <div className="column">
        <div
          className="label-btn"
          onClick={this.clickSeethroughHandler}
          onKeyDown={this.clickSeethroughHandler}
          tabIndex="0"
          role="button"
        >
          <div className="cover">
            <div className="onClickTextOverImage show" style={styles}>
              <div className={`${openedSeethroughOptions ? 'book-cover-seethrough-selected' : 'book-cover-seethrough-unselected'}`}>
                <div className="heart-button-cell">
                  <div
                    className="heart-button-wrapper"
                    onClick={this.clickLikeHandler}
                    onKeyDown={this.clickLikeHandler}
                    role="button"
                    tabIndex="0"
                  >
                    <i className={`${liked ? 'fa' : 'far'} fa-heart`} />
                  </div>
                </div>

                <div className="bookmark-button-cell">
                  <div
                    className="bookmark-button-wrapper"
                    onClick={this.clickBookmarkHandler}
                    onKeyDown={this.clickBookmarkHandler}
                    role="button"
                    tabIndex="0"
                  >
                    <i className={`${bookmarked ? 'fa' : 'far'} fa-bookmark`} />
                  </div>
                </div>
                <div className="description-button-cell">
                  <div
                    className="description-button-wrapper"
                    onClick={this.clickDescriptionHandler}
                    onKeyDown={this.clickDescriptionHandler}
                    role="button"
                    tabIndex="0"
                  >
                    <i className="fa fa-book-open" />
                  </div>
                </div>
                <div className="seethrough-title-rating">
                  <div className="seethrough-title">
                    RATE THIS BOOK
                </div>
                  <div className="seethrough-rating">
                    <i
                      className={`${userRating >= 1 ? 'fa' : 'far'} fa-star`}
                      onClick={(event) => this.clickRatingHandler(event, 1)}
                      onKeyDown={(event) => this.clickRatingHandler(event, 1)}
                      tabIndex="0"
                      role="button"
                      aria-label="Rate 1 star"
                    />
                    <i
                      className={`${userRating >= 2 ? 'fa' : 'far'} fa-star`}
                      onClick={(event) => this.clickRatingHandler(event, 2)}
                      onKeyDown={(event) => this.clickRatingHandler(event, 2)}
                      tabIndex="0"
                      role="button"
                      aria-label="Rate 2 stars"
                    />
                    <i
                      className={`${userRating >= 3 ? 'fa' : 'far'} fa-star`}
                      onClick={(event) => this.clickRatingHandler(event, 3)}
                      onKeyDown={(event) => this.clickRatingHandler(event, 3)}
                      tabIndex="0"
                      role="button"
                      aria-label="Rate 3 stars"
                    />
                    <i
                      className={`${userRating >= 4 ? 'fa' : 'far'} fa-star`}
                      onClick={(event) => this.clickRatingHandler(event, 4)}
                      onKeyDown={(event) => this.clickRatingHandler(event, 4)}
                      tabIndex="0"
                      role="button"
                      aria-label="Rate 4 stars"
                    />
                    <i
                      className={`${userRating >= 5 ? 'fa' : 'far'} fa-star`}
                      onClick={(event) => this.clickRatingHandler(event, 5)}
                      onKeyDown={(event) => this.clickRatingHandler(event, 5)}
                      tabIndex="0"
                      role="button"
                      aria-label="Rate 5 stars"
                    />
                  </div>
                </div>
                <i className="fas fa-caret-left arrow"></i>
                <div id="bookModalInfo" className="bookModalInfo" >
                  <div id="modalHeader">
                    <div id="titleAndYear">
                      <p className="titleModal" style={{ margin: '1% 0' }}>{title}</p>
                      <p className="yearModal">{publishedDate}</p>
                    </div>
                    <p className="authorModal" style={{ margin: '1% 0' }}>
                      Novel by<span id="color-word"> {author}</span>
                    </p>
                    <p className="pageCount">{pageCount} pages</p>
                  </div>
                  <p id="summaryTitle">SUMMARY</p>
                  <article id="summary" style={{ margin: '5% 0' }}>
                    {description}
                  </article>
                  <p id="ratingTitle" style={{ margin: '1% 0' }}>RATING</p>
                  <div className="star-rating rate">
                    <i className={`${averageRating >= 1 ? 'fa' : 'far'} fa-star`} />
                    <i className={`${averageRating >= 2 ? 'fa' : 'far'} fa-star`} />
                    <i className={`${averageRating >= 3 ? 'fa' : 'far'} fa-star`} />
                    <i className={`${averageRating >= 4 ? 'fa' : 'far'} fa-star`} />
                    <i className={`${averageRating >= 5 ? 'fa' : 'far'} fa-star`} />
                  </div>
                  <p style={{ margin: '6% 0' }}></p>
                  <p className="recommend" style={{ margin: '1% 0' }}>RECOMMENDED BY</p>
                  <div className="recommended">
                    <img src="img/recommended/user1.png" />
                    <img src="img/recommended/user2.png" />
                    <img src="img/recommended/user3.png" />
                  </div>
                </div>
              </div>
            </div>
            <div className="cover-info">
              <p className="book-title">{title}</p>
              <p className="book-author">{author}</p>
              <div className="star-rating rate">
                <i className={`${averageRating >= 1 ? 'fa' : 'far'} fa-star`} />
                <i className={`${averageRating >= 2 ? 'fa' : 'far'} fa-star`} />
                <i className={`${averageRating >= 3 ? 'fa' : 'far'} fa-star`} />
                <i className={`${averageRating >= 4 ? 'fa' : 'far'} fa-star`} />
                <i className={`${averageRating >= 5 ? 'fa' : 'far'} fa-star`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Book.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  publishedDate: PropTypes.string,
  description: PropTypes.string,
  pageCount: PropTypes.string,
  averageRating: PropTypes.number,
  thumbnail: PropTypes.string,
  id: PropTypes.string,
};

Book.defaultProps = {
  title: 'No title',
  author: 'No author',
  publishedDate: 'No published date',
  description: 'No description',
  pageCount: 'Not available',
  averageRating: 0,
  thumbnail: '',
  id: '',
};