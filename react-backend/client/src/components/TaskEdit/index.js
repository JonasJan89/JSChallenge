import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

export default class TaskEdit extends Component {
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

    handleTextChange = (e) => {
        this.setState({ textFile: e.target.files[0] });
    };
    handleUnittestChange = (e) => {
        this.setState({ unittestFile: e.target.files[0] });
    };
    handleMethodsChange = (e) => {
        this.setState({ methodsFile: e.target.files[0] });
    };
    handleCodeChange = (e) => {
        this.setState({ code: e.target.files[0] });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.uploadData(this.createFormData());
    };

    createFormData = () => {
        const formData = new FormData();
        let hasNewData = false;
        if(this.state.code) {
            formData.append('code', this.state.code);
            formData.append('withCodeFile', true);
            hasNewData = true;
        }
        if(this.state.textFile) {
            formData.append('taskTextFile', this.state.textFile);
            hasNewData = true;
        }
        if(this.state.unittestFile) {
            formData.append('unittestFile', this.state.unittestFile);
            hasNewData = true;
        }
        if(this.state.methodsFile){
            formData.append('methodsFile', this.state.methodsFile);
            hasNewData = true;
        }

        if(hasNewData) {
            formData.append('id', this.state.taskId);
            return formData;
        }
        return null;
    };

    uploadData = (formData) => {
        if(formData === null) {
            return;
        }
        axios.put(`/tasks/${this.state.taskId}`,
            formData,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((res) => {
                this.setState({
                    task: res.data,
                });
                ReactDOM.findDOMNode(this.refs.taskEdit).reset();
                alert('Aufgabe erfolgreich hochgeladen!');
            })
            .catch(err => alert(err));
    };

    render() {
        if(!this.state.task) {
            return null;
        }
        return (
            <div className="task-edit">
                <div className="container">
                    <div className="task-edit__wrapper white-box">
                        <form ref="taskEdit" onSubmit={this.handleSubmit}>
                            <legend className="task-edit__label">Aufgabe {this.state.task.title} anpassen.</legend>
                            <p className="task-edit__form-item">
                                <label className="task-edit__input-label" htmlFor="taskText">Aufgabenbeschreibung</label>
                                <input id="taskText" type="file" onChange={this.handleTextChange} />
                            </p>
                            <p className="task-edit__form-item">
                                <label className="task-edit__input-label" htmlFor="unittestFile">Unittest Datei</label>
                                <input id="unittestFile" type="file" onChange={this.handleUnittestChange} />
                            </p>
                            <p className="task-edit__form-item">
                                <label className="task-edit__input-label" htmlFor="methodsFile">Methoden Datei</label>
                                <input id="methodsFile" type="file" onChange={this.handleMethodsChange} />
                            </p>
                            <p className="task-edit__form-item">
                                <label className="task-edit__input-label" htmlFor="code">Code Skelett Datei</label>
                                <input id="code" type="file" onChange={this.handleCodeChange} />
                            </p>

                            <button className="btn btn-success" type="submit">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
