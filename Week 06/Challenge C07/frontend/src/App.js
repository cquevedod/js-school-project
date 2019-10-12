import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Book from './components/book/Book';
import Search from './components/search/Search';
import QuickInfo from './components/QuickInfo';
import Login from './components/login/Login';

export default class App extends Component {
  render() {
    return (
      <div className="parent">
        <Header/>
        <div className="content-container">
          <section className="left-sidebar sidebar">
            <div className="left-items">
              <p className="title">main</p>
              <a href="">
                <p><i className="fa fa-fw fa-globe"></i>quito</p>
              </a>
              <a href="">
                <p><i className="fa fa-fw fa-globe"></i>cartagena</p>
              </a>
              <a href="">
                <p><i className="fa fa-fw fa-globe"></i>medellín</p>
              </a>
              <a href="">
                <p><i className="fa fa-fw fa-tablet-alt"></i>digital</p>
              </a>
              <a href="">
                <p><i className="fa fa-fw fa-user-tag"></i>personal loans</p>
              </a>
              <a href="">
                <p id="white"><i className="fa fa-tags"></i>new releases</p>
              </a>
              <p className="title">your books</p>
              <a href="">
                <p><i className="fa fa-fw fa-book-open"></i>readings</p>
              </a>
              <a href="">
                <p><i className="fa fa-fw fa-history"></i>history</p>
              </a>
              <a href="">
                <p><i className="fa fa-fw fa-bookmark"></i>read later</p>
              </a>
              <a href="">
                <p><i className="fa fa-fw fa-heart"></i>favorites</p>
              </a>
            </div>
          </section>

          <section className="center-content">
            <section className="top-container">
              <div className="top-text">
                <span id="title-left">
                  <p>New Releases</p>
                </span>
                <span id="title-center">
                  <p id="text-one">Releases Date</p>
                  <p id="text-two">Popularity</p>
                </span>
                <span id="title-right">
                  <p>
                    <i className="fa fa-fw fa-th-large"></i>
                    <i className="fa fa-fw fa-th-list"></i>
                  </p>
                </span>
              </div>
            </section>
            <div id="bookshelfbooks" className="row">

            </div>

          </section>

          <section className="right-sidebar sidebar">
            <div className="content-list">
              <p className="title-list">most read books</p>
              <ol className="font-list">
                <li>&nbsp; Hooked: How to Build Habit-...</li>
                <li>&nbsp; The Inevitable: Understandin...</li>
                <li>&nbsp; Lean In: Women, Work, and t...</li>
                <li>&nbsp; Bulding a Business When Th...</li>
                <li>&nbsp; How Google Works</li>
              </ol>
            </div>
          </section>
        </div>
    </div>   
  
  );
  }
 
}


