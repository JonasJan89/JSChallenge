import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

//components
import TasksRouter from './router/TasksRouter';
import FeedbacksRouter from './router/FeedbacksRouter';
import LecturerRouter from "./router/LecturerRouter";
import TaskCreate from "./components/TaskCreate";
import TaskEdit from "./components/TaskEdit";
import Header from "./components/Header";
import Home from "./components/Home";

//ToDo Home
class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Switch>
                    <Route path='/tasks' component={TasksRouter}/>
                    <Route path='/feedbacks' component={FeedbacksRouter}/>
                    <Route path='/lecturer' component={LecturerRouter}/>
                    <Route path='/createATask' component={TaskCreate}/>
                    <Route path='/editTask/:id' component={TaskEdit}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </div>
        );
    }
}

export default App;
