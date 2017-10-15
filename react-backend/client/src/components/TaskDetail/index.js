import React, { Component } from 'react';
import jsFileDownload from 'js-file-download';
import axios from 'axios';
import './index.css';

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
                <div className="container">
                    <div className="task-detail__wrapper white-box">
                        <h4 className="task-detail__title" >This is {this.state.task.title}</h4>
                        <div className="task-detail__download-wrapper">
                            <p className="task-detail__download-label">You can download the task-text here:</p>
                            <a href={`http://localhost:3001/tasks/${this.state.task._id}/textdownload`} download>
                                <button className="task-detail__download-button btn btn-secondary">
                                    task-text
                                </button>
                            </a>
                        </div>
                        {this.state.task.withCodeFile &&
                        <div className="task-detail__download-wrapper">
                            <p className="task-detail__download-label">You can download the code base here:</p>
                            <button onClick={this.handleCodeDownload} className="task-detail__download-button btn btn-secondary">
                                code base
                            </button>
                        </div>
                        }
                    </div>
                    <SolutionUpload taskID={this.state.task._id} />
                </div>
            </div>
        );
    }
}
