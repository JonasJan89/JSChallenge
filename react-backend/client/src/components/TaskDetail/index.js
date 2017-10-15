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
                    alert("Sorry, die Datei wurde nicht gefunden.");
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
                        <h4 className="task-detail__title" >Detailansicht der Aufgabe {this.state.task.title}</h4>
                        <div className="task-detail__download-wrapper">
                            <p className="task-detail__download-label">Die Aufgabenbeschreibung kannst du hier herunterladen:</p>
                            <a href={`http://localhost:3001/tasks/${this.state.task._id}/textdownload`} download>
                                <button className="task-detail__download-button btn btn-secondary">
                                    Aufgabentext
                                </button>
                            </a>
                        </div>
                        {this.state.task.withCodeFile &&
                        <div className="task-detail__download-wrapper">
                            <p className="task-detail__download-label">Das benötigte Codeskelett kannst du hier herunterladen:</p>
                            <button onClick={this.handleCodeDownload} className="task-detail__download-button btn btn-secondary">
                                Codeskelett
                            </button>
                        </div>
                        }
                    </div>
                </div>
                <SolutionUpload taskID={this.state.task._id} />
            </div>
        );
    }
}
