import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Book.scss';
import heartImage from '../../assets/img/rate-book/heart.png';
import openedBookImg from '../../assets/img/rate-book/opened-book.png';
import bookmarkImg from '../../assets/img/rate-book/bookmark.png';


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
                        <div className="onClickTextOverImage" style={styles}>
                            <div className="info-over-cover">
                                <img src={heartImage} className="icon-up-left" />
                                <img src={openedBookImg} className="icon-center" />
                                <img src={bookmarkImg} className="icon-up-right" />
                                <p className="rating-book">rate this book</p>
                                <div className="star-rating-book rate">
                                    {`${userRating}`}
                                </div>
                            </div>
                            <i className="fas fa-caret-left arrow"></i>
                            <div id="bookModalInfo" className="bookModalInfo">
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
                                    {averageRating}
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
                        <div className="cover-info">
                            <p className="book-title">{title}</p>
                            <p className="book-author">{author}</p>
                            <div className="star-rating rate">
                                {averageRating}
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