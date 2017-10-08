import React, { Component } from 'react';
import axios from 'axios';
import FeedbackView from '../FeedbackView';

export default class AssessorView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            solutionID: props.solutionID,
            feedback: null,
        };
    }

    handleClick = (e) => {
        e.preventDefault();
        axios.get(`/assessor/${this.state.solutionID}`)
            .then(res => this.setState({
                feedback: {
                    staticFeedback: res.data.staticAutomaticFeedback,
                    dynamicFeedback: res.data.dynamicAutomaticFeedback
                },
            }))
            .catch(err => alert(err));
    };

    render() {
        return(
            <div className="assessor-view">
                <button onClick={this.handleClick} >assess solution</button>
                <FeedbackView feedback={this.state.feedback} />
            </div>
        );
    }
};
