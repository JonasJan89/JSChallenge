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
                        <h4>Willkommen im Dozentenbereich!</h4>
                        <p className="lecturer-view__description">
                            Hier kannst du eine neue Aufgabe erstellen:
                        </p>
                        <Link to="/createATask">
                            <button className="btn btn-secondary">
                                Eine Aufgabe erstellen
                            </button>
                        </Link>
                    </div>
                </div>
                <TasksView onLecturersView={true} />
            </div>
        );
    };
}
