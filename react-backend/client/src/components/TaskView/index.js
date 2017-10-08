import React, { Component } from 'react';
import axios from 'axios';

//components
import TaskDetail from '../TaskDetail';

export default class TaskView extends Component {
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
                {this.state.tasks.map(task => {
                   return (
                       <div key={task._id} className="task-view__task-detail">
                           <TaskDetail task={task} />
                       </div>
                   );
                })}
            </div>
        );
    }
}
