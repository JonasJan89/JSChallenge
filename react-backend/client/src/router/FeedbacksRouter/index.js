import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import FeedbackView from "../../components/FeedbackView/index";

export default class TasksRouter extends Component {
    render() {
        return (
            <Switch>
                <Route path='/feedbacks/:id' component={FeedbackView}/>
            </Switch>
        );
    }
}
