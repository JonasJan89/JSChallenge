import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

//Components
import TasksView from '../TasksView';

export default class LecturerView extends Component {

    render() {
        return (
            <div className="lecturer-view">
                <div className="container">
                    <div className="lecturer-view__wrapper white-box">
                        <h5>Welcome to lecturers view</h5>
                        <Link to="/createATask">create a task</Link>
                    </div>
                </div>
                <TasksView onLecturersView={true} />
            </div>
        );
    };
}
