import React, { Component } from 'react';
import StaticFeedbackView from '../StaticFeedbackView';
import DynamicFeedbackView from '../DynamicFeedbackView';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class FeedbackView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedback: {},
            solutionID: props.match.params.id,
        };
    }

    componentWillMount() {
        axios.get(`/assessor/${this.state.solutionID}`)
            .then(res => this.setState({
                feedback: {
                    staticFeedback: res.data.staticAutomaticFeedback,
                    dynamicFeedback: res.data.dynamicAutomaticFeedback
                },
            }))
            .catch(err => alert(err));
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ feedback: nextProps.feedback });
    }

    render() {
        return(
            <div className="feedback-view">
                {this.state.feedback && this.state.feedback.staticFeedback &&
                    <StaticFeedbackView staticFeedback={this.state.feedback.staticFeedback}/>
                }
                {this.state.feedback && this.state.feedback.dynamicFeedback && this.state.feedback.staticFeedback.length <= 0 &&
                    <DynamicFeedbackView dynamicFeedback={this.state.feedback.dynamicFeedback}/>
                }
                <Link  to={`/tasks`}>
                    <button>back to tasks</button>
                </Link>
            </div>
        );
    }
};
