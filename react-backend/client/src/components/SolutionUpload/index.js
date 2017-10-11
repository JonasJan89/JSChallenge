import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import AssessorView from '../AssessorView';

export default class SolutionUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            taskID: props.taskID,
            file: null,
            solution: null,
        };
    }

    handleChange = (e) => {
        this.setState({ file: e.target.files[0] });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.file === null) {
            alert('Please choose a file to upload.');
            return;
        }
        this.uploadData(this.createFormData());
    };

    createFormData = () => {
        const formData = new FormData();
        formData.append('code', this.state.file);

        //ToDo user registrieren und nicht mehr hard coden
        // formData.append('studentID', 123);

        formData.append('taskID', this.state.taskID);
        return formData;
    };

    uploadData = (formData) => {
        axios.post('/solutions',
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
