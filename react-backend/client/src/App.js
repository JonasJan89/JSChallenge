import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],

        };
    }

    componentDidMount() {
        fetch('/tasks')
            .then(res => {
                if(res.status !== 204){
                    return res.json();
                }
            })
            .then(tasks => {
                if(tasks) {
                    this.setState({ tasks })
                }
            });
    }

    // handleChange = (event) => {
    //     this.setState({newUser: {username: event.target.value}});
    //     event.preventDefault();
    // };
    //
    // handleSubmit = (event) => {
    //     fetch('/users', {
    //         method: "POST",
    //         body: JSON.stringify(this.state.newUser),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(users => this.setState({ users }));
    //     event.preventDefault();
    // };

    render() {
        return (
            <div className="App">
                <h1>Hier sind die tasks</h1>
                {this.state.tasks.map(task => {
                    if (task !== undefined) {
                        return <h3 key={task._id} >{task.title} {task.taskText}</h3>;
                    }
                    return null;
                })}
            </div>
        );
    }
}

export default App;
