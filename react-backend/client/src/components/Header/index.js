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
                            <h3 className="header__title">JSChallenge - prototype</h3>
                        </div>
                        <div className="header__links-wrapper">
                            <Link className="header__link" to="/">home</Link>
                            <Link className="header__link" to="/lecturer">lecturer</Link>
                            <Link className="header__link" to="/tasks">student</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
