import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import AssessorView from '../AssessorView';
import './index.css';

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
                    alert('Lösung erfolgreich hochgeladen!');
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
                    alert('Lösung erfolgreich hochgeladen!');
                })
                .catch( err => alert(err));
        }

    };

    render() {
        return(
            <div className="solution-upload">
                <div className="container">
                    <div className="solution-upload__wrapper white-box">
                        <form className="solution-upload__form" ref="solutionUpload" onSubmit={this.handleSubmit}>
                            {this.props.onFeedbackView ? (
                                <h4 className="solution-upload__legend">
                                    Möchtest du eine neue Lösung einreichen?
                                </h4>
                            ):(
                                <h4 className="solution-upload__legend">
                                    Du hast eine Lösung für die Aufgabe?
                                </h4>
                            )}
                            <p>Dann lade sie hier hoch und lasse sie vom System automatisch testen:</p>
                            <input className="solution-upload__input" type="file" onChange={this.handleChange} />
                            {this.state.file !== null &&
                                <button className=" btn btn-primary" type="submit">
                                    Lösung hochladen
                                </button>
                            }
                        </form>
                        {this.state.solution &&
                            <AssessorView solutionID={this.state.solution._id} />
                        }
                    </div>
                </div>
            </div>
        );
    }
};
