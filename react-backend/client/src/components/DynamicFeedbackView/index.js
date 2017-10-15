import React, { Component } from 'react';
import './index.css';

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
        let allPassed = true;
        if(this.state.dynamicFeedback.length <= 0) {
            return(
                <div className="dynamic-feedback-view">
                    <p>Es wurden keine dynamischen Probleme in deiner Lösung entdeckt.</p>
                </div>
            );
        }
        return(
            <div className="dynamic-feedback-view">
                <h4>Die Unittests ergaben folgendes Feedback:</h4>
                {this.state.dynamicFeedback.map((feedback, index) => {
                    return (
                        <div key={index}>
                            {feedback.state === 'failed' ? allPassed = false : null}
                            <p className={feedback.state === 'passed' ? "dynamic-feedback-view__passed" : "dynamic-feedback-view__failed"}>
                                {feedback.title} - {feedback.state}
                            </p>
                        </div>
                    );
                })}
                {allPassed &&
                <h4>Alle Tests sind bestanden. Super!</h4>
                }
            </div>
        );
    }
};
