import React, { Component } from 'react';
import fileDownload from 'js-file-download';
import axios from 'axios';

//components
import SolutionUpload from '../SolutionUpload';

export default class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskId: props.match.params.id,
        };
    }

    componentDidMount() {
        axios.get(`/tasks/${this.state.taskId}`)
            .then(task => this.setState({ task: task.data }))
            .catch(err => alert(err));
    }

    handleTaskDownload = (event) => {
        axios.get(`/tasks/${this.state.task._id}/download`)
            .then(res => {
                if(res.status === 204){
                    alert("Sorry, das File wurde nicht gefunden.");
                } else {
                    console.log(res);
                    fileDownload(res.data, `${this.state.task.title}.js`);
                }
            })
            .catch(err => alert(err));
        event.preventDefault();
    };

    render() {
        if(!this.state.task) {
            return null;
        }
        return (
            <div className="task-detail">
                <h4 className="task-detail__title" >{this.state.task.title}</h4>
                <p className="task-detail__text" >{this.state.task.taskText}</p>
                {this.state.task.withFile &&
                <button onClick={this.handleTaskDownload} className="task-detail__download-button">
                    {this.state.task.title} Codedownload
                </button>
                }
                <SolutionUpload taskID={this.state.task._id} />
            </div>
        );
    }
}
