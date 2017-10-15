import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class Header extends Component {

    render() {
        return(
            <div className="header white-box">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__title-wrapper">
                            <h2 className="header__title">JSChallenge - Prototyp</h2>
                        </div>
                        <div className="header__links-wrapper">
                            <Link className="header__link" to="/">
                                <button className="btn btn-link">
                                    Home
                                </button>
                            </Link>
                            <Link className="header__link" to="/lecturer">
                                <button className="btn btn-link">
                                    Dozent
                                </button>
                            </Link>
                            <Link className="header__link" to="/tasks">
                                <button className="btn btn-link">
                                    Student
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
