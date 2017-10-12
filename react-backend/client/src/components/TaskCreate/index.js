import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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
                alert('Task uploaded!');
                console.log(this.state);
            })
            .catch(err => alert(err));

    };

    render() {
        return (
            <div className="create-task">
                <form ref="createATask" onSubmit={this.handleSubmit}>
                    <legend>Create a task</legend>
                    <p>
                        <label htmlFor="title">Task Title</label>
                        <input id="title" type="text" onChange={this.handleTitleChange} required/>
                    </p>
                    <p>
                        <label htmlFor="taskText">Task Text</label>
                        <input id="taskText" type="file" onChange={this.handleTextChange} required/>
                    </p>
                    <p>
                        <label htmlFor="unittestFile">Unittest File</label>
                        <input id="unittestFile" type="file" onChange={this.handleUnittestChange} required/>
                    </p>
                    <p>
                        <label htmlFor="methodsFile">Methods File</label>
                        <input id="methodsFile" type="file" onChange={this.handleMethodsChange} required/>
                    </p>
                    <p>
                        <label htmlFor="code">Code File</label>
                        <input id="code" type="file" onChange={this.handleCodeChange} />
                    </p>

                    <button type="submit">Upload</button>
                </form>
            </div>
        );
    };
}