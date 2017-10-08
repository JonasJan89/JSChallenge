import React, { Component } from 'react';
import StaticFeedbackView from '../StaticFeedbackView';
import DynamicFeedbackView from '../DynamicFeedbackView';

export default class FeedbackView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedback: props.feedback,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ feedback: nextProps.feedback });
    }

    render() {
        console.log('FeedbackView props:');
        console.log(this.props.feedback);
        console.log('FeedbackView state:');
        console.log(this.state.feedback);
        return(
            <div className="feedback-view">
                {this.state.feedback && this.state.feedback.staticFeedback &&
                    <StaticFeedbackView staticFeedback={this.state.feedback.staticFeedback}/>
                }
                {this.state.feedback && this.state.feedback.staticFeedback &&
                    <DynamicFeedbackView dynamicFeedback={this.state.feedback.dynamicFeedback}/>
                }
            </div>
        );
    }
};
