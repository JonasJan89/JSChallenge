import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import TasksView from '../../components/TasksView/index';
import TaskDetail from '../../components/TaskDetail/index';

//ToDo Header, home, lecturer!
export default class TasksRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/tasks' component={TasksView}/>
                <Route path='/tasks/:id' component={TaskDetail}/>
            </Switch>
        );
    }
}
