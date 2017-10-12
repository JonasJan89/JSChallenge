import React, { Component } from 'react';
import jsFileDownload from 'js-file-download';
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

    handleCodeDownload = (event) => {
        axios.get(`/tasks/${this.state.task._id}/codedownload`)
            .then(res => {
                if(res.status === 204){
                    alert("Sorry, das File wurde nicht gefunden.");
                } else {
                    jsFileDownload(res.data, `${this.state.task.title} codebase.js`);
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
                <a href={`http://localhost:3001/tasks/${this.state.task._id}/textdownload`} download>
                    <button className="task-detail__download-button">
                        {this.state.task.title} text download
                    </button>
                </a>
                {this.state.task.withCodeFile &&
                <button onClick={this.handleCodeDownload} className="task-detail__download-button">
                    {this.state.task.title} code download
                </button>
                }
                <SolutionUpload taskID={this.state.task._id} />
            </div>
        );
    }
}
