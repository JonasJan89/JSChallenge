import React, { Component } from 'react';
import fileDownload from 'js-file-download';
import axios from 'axios';

//components
import SolutionUpload from '../SolutionUpload';

export default class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task,
        };
    }

    handleTaskDownload = (event) => {
        let title = event.target.value;
        axios.get(`/tasks/download/${title}`)
            .then(res => {
                if(res.status === 204){
                    alert("Sorry, das File wurde nicht gefunden.");
                } else {
                    fileDownload(res, `${title}.js`);
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
                {this.state.task.fileName &&
                <button onClick={this.handleTaskDownload} value={this.state.task.title} className="task-detail__download-button">
                    {this.state.task.title} Codedownload
                </button>
                }
                <SolutionUpload taskID={this.state.task._id} />
            </div>
        );
    }
}
