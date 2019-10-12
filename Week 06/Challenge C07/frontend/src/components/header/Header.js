import React, { Component } from 'react'
import logo from '../../assets/img/logo.svg';
import avatar from '../../assets/img/avatar.png';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav class="navbar-header">
                    <div class="logo-container">
                        <a class="navbar-logo"
                        ><img href="#" src={logo} alt="logo" class="logo" id="joblogo"
                            /></a>
                        <a href="#" id="text-box"><span id="jobsity-text">JOBSITY</span></a>
                    </div>
                    <div class="nav-center-container">
                        <a href="#" id="book-box"><span id="bookshelf">Bookshelf</span></a>
                        <div class="search-container">
                            <form action="#">
                                <label for="search-field">
                                    <i class="fa fa-search search-icon"></i>
                                </label>
                                <input
                                    class="search-box"
                                    type="text"
                                    placeholder="Search..."
                                    name="search"
                                    required=""
                                />
                            </form>
                        </div>
                    </div>
                    
                    <div class="login">
                        <a href="#"
                        >Jakob Treml&nbsp;&nbsp;&nbsp;<i
                            class="fa fa-angle-down angle-icon"
                        ></i
                            ></a>
                        <img src={avatar} alt="Avatar" class="avatar" />
                    </div>
                </nav>

            </div>
        )
    }
}
