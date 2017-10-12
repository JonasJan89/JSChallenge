import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


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
            return null;
        }
        return (
            <div className="task-view">
                <h4>Here are all available task. Choose one!</h4>
                <ul>
                {this.state.tasks.map(task => {
                   return (
                       <li key={task._id}>
                           <Link  to={{
                               pathname: `${this.getPathName()}${task._id}`,
                           }}>
                               {task.title}
                           </Link>
                       </li>
                   );
                })}
                </ul>
            </div>
        );
    }
}

