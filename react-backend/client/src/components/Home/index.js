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
                          <h4>Willkommen im JSChallenge Prototyp!</h4>
                          <h5>Bitte wähle einen der beiden Bereiche aus:</h5>
                      </div>
                      <div className="home__link-wrapper">
                          <Link className="home__link" to={`/lecturer`}>
                              <button className="btn btn-secondary">Dozentenbereich</button>
                          </Link>
                          <Link className="home__link" to={`/tasks`}>
                              <button className="btn btn-secondary">Studentenbereich</button>
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}