import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

//components
import TasksRouter from './router/TasksRouter';
import FeedbacksRouter from './router/FeedbacksRouter';
import './App.css';

//ToDo Header, home, lecturer!
class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path='/tasks' component={TasksRouter}/>
                    <Route path='/feedbacks' component={FeedbacksRouter}/>
                </Switch>
            </div>
        );
    }
}

export default App;
