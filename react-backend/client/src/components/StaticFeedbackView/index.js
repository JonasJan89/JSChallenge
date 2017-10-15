import React, { Component } from 'react';
import './index.css';

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
                    <h4>Es wurden keine statischen Fehler in deiner Lösung entdeckt.</h4>
                </div>
            );
        }
        return(
            <div className="static-feedback-view">
                <h4>Es wurden statische Fehler in deiner Lösung entdeckt. </h4>
                {this.state.staticFeedback.map((feedback, index) => {
                    if (feedback.type && feedback.type === 'missingMethods') {
                        return (
                            <div className="static-feedback-view__wrapper white-box" key={index}>
                                <p>Folgende Methoden fehlen in deiner Lösung:</p>
                                {feedback.message.map((m,i) => <p className="white-box" key={i}>{m}</p>)}
                                <p>Lade bitte eine neue Lösung mit den fehlenden Methoden hoch.</p>
                            </div>
                        );
                    }
                    return (
                        <div className="static-feedback-view__wrapper white-box"  key={index}>
                            <p>line {feedback.line}, column {feedback.column}: {feedback.message}</p>
                            <p>source: {feedback.source}</p>
                            {feedback.ruleId &&
                            <p>ESLint rule: {feedback.ruleId}</p>
                            }
                        </div>
                    );
                })}
            </div>
        );
    }
};
