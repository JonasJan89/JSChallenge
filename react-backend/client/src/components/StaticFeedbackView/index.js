import React, { Component } from 'react';

export default class StaticFeedbackView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            staticFeedback: props.staticFeedback,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ staticFeedback: nextProps.staticFeedback });
    }

    render() {
        if(this.state.staticFeedback.length <= 0) {
            return (
                <div className="static-feedback-view">
                    <h4>No static issues in your code found. Great!</h4>
                </div>
            );
        }
        return(
            <div className="static-feedback-view">
                <h4>static issues: </h4>
                {this.state.staticFeedback.map((feedback, index) => {
                    if (feedback.type && feedback.type === 'missingMethods') {
                        return (
                            <div key={index}>
                                <h4>There are some methods missing:</h4>
                                {feedback.message.map((m,i) => <p key={i}>${m}</p>)}
                            </div>
                        );
                    }
                    return (
                        <div key={index}>
                            <p>line {feedback.line}, column {feedback.column}: {feedback.message}</p>
                            <p>source: {feedback.source}</p>
                            <p>ESLint rule: {feedback.ruleId}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
};
