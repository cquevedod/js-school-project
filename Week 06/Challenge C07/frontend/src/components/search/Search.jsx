import React, { Component } from 'react'
import './Search.scss';

export default class Search extends Component {
    render() {
        return (
            <div>
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
        )
    }
}
