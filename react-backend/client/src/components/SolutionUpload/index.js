import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import AssessorView from '../AssessorView';

export default class SolutionUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskID: props.taskID || null,
            solutionID: props.solutionID || null,
            file: null,
            solution: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            solutionID: nextProps.solutionID || null,
            taskID: nextProps.taskID || null,
        });
    }

    handleChange = (e) => {
        this.setState({ file: e.target.files[0] });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.uploadData(this.createFormData());
    };

    createFormData = () => {
        const formData = new FormData();
        formData.append('code', this.state.file);
        //ToDo user registrieren und nicht mehr hard coden
        // formData.append('studentID', 123);
        if(this.state.taskID) {
            formData.append('taskID', this.state.taskID);
        }
        return formData;
    };

    uploadData = (formData) => {
        let path =  '/solutions';
        if (this.state.solutionID) {
            path += `/${this.state.solutionID}`;
            axios.put(path,
                formData,
                {headers: {
                    'content-type': 'multipart/form-data'
                }})
                .then((res)=>{
                    this.setState({
                        solution: res.data,
                        file: null,
                    });
                    ReactDOM.findDOMNode(this.refs.solutionUpload).reset();
                    alert('Solution uploaded!');
                })
                .catch( err => alert(err));
        } else {
            axios.post(path,
                formData,
                {headers: {
                    'content-type': 'multipart/form-data'
                }})
                .then((res)=>{
                    this.setState({
                        solution: res.data,
                        file: null,
                    });
                    ReactDOM.findDOMNode(this.refs.solutionUpload).reset();
                    alert('Solution uploaded!');
                })
                .catch( err => alert(err));
        }

    };

    render() {
        return(
            <div className="solution-upload">
                <form ref="solutionUpload" onSubmit={this.handleSubmit}>
                    <p>Solution upload</p>
                    <input type="file" onChange={this.handleChange} />
                    {this.state.file !== null &&
                        <button type="submit">Upload</button>
                    }
                </form>
                {this.state.solution &&
                    <AssessorView solutionID={this.state.solution._id} />
                }
            </div>
        );
    }
};
