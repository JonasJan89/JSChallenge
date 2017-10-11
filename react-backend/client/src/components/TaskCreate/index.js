import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class TaskCreate extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        ReactDOM.findDOMNode(this.refs.createATask).reset();
    };

    render() {
        return (
            <div className="create-task">
                <form ref="createATask" onSubmit={this.handleSubmit}>
                    <legend>Create a task</legend>
                    <p>
                        <label htmlFor="title">Task Title</label>
                        <input id="title" type="text" />
                    </p>
                    <p>
                        <label htmlFor="taskText">Task Text</label>
                        <input id="taskText" type="textarea" />
                    </p>
                    <p>
                        <label htmlFor="unittestFile">Unittest File</label>
                        <input id="unittestFile" type="file" />
                    </p>
                    <p>
                        <label htmlFor="methodsFile">Methods File</label>
                        <input id="methodsFile" type="file" />
                    </p>
                    <p>
                        <label htmlFor="code">Code File</label>
                        <input id="code" type="file" />
                    </p>

                    <button type="submit">Upload</button>
                </form>
            </div>
        );
    };
}