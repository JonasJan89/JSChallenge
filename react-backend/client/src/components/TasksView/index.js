import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

export default class TasksView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            onLecturersView: props.onLecturersView || false,
        };
    }

    componentDidMount() {
        axios.get('/tasks')
            .then(tasks => this.setState({ tasks: tasks.data }))
            .catch(err => alert(err));
    }

    getPathName = () => {
        if(this.state.onLecturersView) {
            return '/editTask/'
        }
        return '/tasks/';
    };

    render() {
        if(!this.state.tasks) {
            return(
                <div className="tasks-view">
                    <div className="container">
                        <div className="tasks-view__wrapper white-box">
                            <h4>Es sind derzeit leider keine Aufgaben verfügbar.</h4>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="tasks-view">
                <div className="container">
                    <div className="tasks-view__wrapper white-box">
                        {this.props.onLecturersView ? (
                            <div className="tasks-view__description-wrapper">
                                <h4>Hier sind alle bereits erstellten Aufgaben aufgelistet.</h4>
                                <p>Wähle eine Aufgabe um sie anzupassen.</p>
                            </div>
                        ):(
                            <div className="tasks-view__description-wrapper">
                                <h4>Willkommen im Studentenbereich!</h4>
                                <p>Wähle eine Aufgabe aus um sie zu bearbeiten.</p>
                            </div>
                        )}
                        <div className="tasks-view__tasks-wrapper">
                            {this.state.tasks.map(task => {
                                return (
                                    <div className="tasks-view__link-wrapper">
                                        <Link key={task._id}  to={{
                                            pathname: `${this.getPathName()}${task._id}`,
                                        }}>
                                            <button className="btn btn-secondary">
                                                {task.title}
                                            </button>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

