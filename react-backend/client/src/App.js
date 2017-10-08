import React, { Component } from 'react';

//components
import TaskView from './components/TaskView';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <TaskView />
            </div>
        );
    }
}

export default App;
