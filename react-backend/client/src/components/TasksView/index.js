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
                <div className="task-view">
                    <div className="container">
                        <div className="task-view__wrapper white-box">
                            <h5>no tasks available</h5>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="task-view">
                <div className="container">
                    <div className="task-view__wrapper white-box">
                        <h5>Here are all available task. Choose one!</h5>
                        {this.state.tasks.map(task => {
                            return (
                                <Link key={task._id}  to={{
                                    pathname: `${this.getPathName()}${task._id}`,
                                }}>
                                    {task.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

