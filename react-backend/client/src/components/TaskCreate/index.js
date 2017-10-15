import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

export default class TaskCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: null,
        };
    };

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };
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
        if(this.state.code) {
            formData.append('code', this.state.code);
            formData.append('withCodeFile', true);
        }
        formData.append('title', this.state.title);
        formData.append('taskTextFile', this.state.textFile);
        formData.append('unittestFile', this.state.unittestFile);
        formData.append('methodsFile', this.state.methodsFile);
        return formData;
    };

    uploadData = (formData) => {
        axios.post('/tasks',
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
                ReactDOM.findDOMNode(this.refs.createATask).reset();
                alert('Aufgabe erfolgreich hochgeladen!');
            })
            .catch(err => alert(err));

    };

    render() {
        return (
            <div className="create-task">
                <div className="container">
                    <div className="create-task white-box">
                        <form ref="createATask" onSubmit={this.handleSubmit}>
                            <legend className="create-task__legend">Erstelle eine Aufgabe</legend>
                            <p className="create-task__form-item">
                                <label className="create-task__input-label" htmlFor="title">Aufgabentitle*</label>
                                <input className="create-task__input" id="title" type="text" onChange={this.handleTitleChange} required/>
                            </p>
                            <p className="create-task__form-item">
                                <label className="create-task__input-label" htmlFor="taskText">Aufgabenbeschreibung*</label>
                                <input className="create-task__input" id="taskText" type="file" onChange={this.handleTextChange} required/>
                            </p>
                            <p className="create-task__form-item">
                                <label className="create-task__input-label" htmlFor="unittestFile">Unittest Datei*</label>
                                <input className="create-task__input" id="unittestFile" type="file" onChange={this.handleUnittestChange} required/>
                            </p>
                            <p className="create-task__form-item">
                                <label className="create-task__input-label" htmlFor="methodsFile">Methoden Datei*</label>
                                <input className="create-task__input" id="methodsFile" type="file" onChange={this.handleMethodsChange} required/>
                            </p>
                            <p className="create-task__form-item">
                                <label className="create-task__input-label" htmlFor="code">Code Skelett Datei</label>
                                <input className="create-task__input" id="code" type="file" onChange={this.handleCodeChange} />
                            </p>
                            <p className="create-task__form-item">
                                *diese Felder sind erforderlich für eine komplette Aufgabe
                            </p>
                            {this.state.title && this.state.textFile && this.state.unittestFile && this.state.methodsFile ? (
                                <button className="btn btn-success" type="submit">Aufgabe hochladen</button>
                            ):(
                                <button className="btn btn-secondary btn-disabled" type="submit" disabled>Aufgabe hochladen</button>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}