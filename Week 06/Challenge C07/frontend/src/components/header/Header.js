import React, { Component } from 'react'
import logo from '../../assets/img/logo.svg';
import avatar from '../../assets/img/avatar.png';
import './Header.css';
import Search from '../search/Search';

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
                       <Search/>
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
