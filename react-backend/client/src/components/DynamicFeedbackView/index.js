import React, { Component } from 'react';

export default class DynamicFeedbackView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dynamicFeedback: props.dynamicFeedback,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ dynamicFeedback: nextProps.dynamicFeedback });
    }

    render() {
        console.log(this.state.dynamicFeedback);
        if(this.state.dynamicFeedback.length <= 0) {
            return(
                <div className="dynamic-feedback-view">
                    <p>No dynamic issues in your code found. Great!</p>
                </div>
            );
        }
        return(
            <div className="dynamic-feedback-view">
                <h4>dynamic issues:</h4>
                {this.state.dynamicFeedback.map((feedback, index) => {
                    return (
                        <div key={index}>
                            <p>{feedback.title} - {feedback.state}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
};
