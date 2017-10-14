import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

export default class Home extends Component {
    render() {
        return(
          <div className="home">
              <div className="container">
                  <div className="home__wrapper white-box">
                      <div className="home__title">
                          <h5>Welcome to the JSChallenge prototype! Please choose an area:</h5>
                      </div>
                      <div className="home__link-wrapper">
                          <Link className="home__link" to={`/lecturer`}>
                              <button className="btn btn-secondary">I am a lecturer</button>
                          </Link>
                          <Link className="home__link" to={`/tasks`}>
                              <button className="btn btn-secondary">I am a student</button>
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}