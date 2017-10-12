import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Components
import TasksView from '../TasksView';

export default class LecturerView extends Component {

    render() {
        return (
            <div className="lecturer-view">
                <h4>Lecturer View!</h4>
                <Link to="/createATask">create a task</Link>
                <TasksView onLecturersView={true} />
            </div>
        );
    };
}
