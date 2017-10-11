import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default class TasksView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        };
    }

    componentDidMount() {
        axios.get('/tasks')
            .then(tasks => this.setState({ tasks: tasks.data }))
            .catch(err => alert(err));
    }

    render() {
        if(!this.state.tasks) {
            return null;
        }
        return (
            <div className="task-view">
                <h3>Hier sind die tasks!</h3>
                <ul>
                {this.state.tasks.map(task => {
                   return (
                       <li key={task._id}>
                           <Link  to={{
                               pathname: `/tasks/${task._id}`,
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

