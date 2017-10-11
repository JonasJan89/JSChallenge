import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LecturerView extends Component {

    render() {
        return (
            <div className="lecturer-view">
                <h4>Lecturer View!</h4>
                <Link to="/createATask">creating a task</Link>
            </div>
        );
    };
}
