import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';

//components
import TasksRouter from './router/TasksRouter';
import FeedbacksRouter from './router/FeedbacksRouter';
import LecturerRouter from "./router/LecturerRouter";
import TaskCreate from "./components/TaskCreate";

//ToDo Header, home, lecturer!
class App extends Component {
    render() {
        return (
            <div className="App">
                <Switch>
                    <Route path='/tasks' component={TasksRouter}/>
                    <Route path='/feedbacks' component={FeedbacksRouter}/>
                    <Route path='/lecturer' component={LecturerRouter}/>
                    <Route path='/createATask' component={TaskCreate}/>
                </Switch>
            </div>
        );
    }
}

export default App;
