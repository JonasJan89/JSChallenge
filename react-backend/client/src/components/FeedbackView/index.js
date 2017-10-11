import React, { Component } from 'react';
import StaticFeedbackView from '../StaticFeedbackView';
import DynamicFeedbackView from '../DynamicFeedbackView';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SolutionUpload from "../SolutionUpload/index";

export default class FeedbackView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedback: null,
            solutionID: props.match.params.id,
        };
    }

    componentWillMount() {
        this.getFeedback();
    }

    getFeedback = () => {
        console.log('get feedback');
        axios.get(`/assessor/${this.state.solutionID}`)
            .then(res => {
                this.setState({
                    feedback: {
                        staticFeedback: res.data.staticAutomaticFeedback,
                        dynamicFeedback: res.data.dynamicAutomaticFeedback
                    },
                })
                console.log(res.data);
            })
            .catch(err => alert(err));
    };

    componentWillReceiveProps(nextProps) {
        if(nextProps.feedback) {
            this.setState({ feedback: nextProps.feedback });
        } else {
            this.getFeedback();
        }
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
                <h4>Upload a new solution</h4>
                {this.state.solutionID &&
                    <SolutionUpload solutionID={this.state.solutionID}/>
                }
                <Link  to={`/tasks`}>
                    <button>back to tasks</button>
                </Link>
            </div>
        );
    }
};
