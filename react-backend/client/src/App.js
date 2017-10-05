import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            newUser: {},
        };
    }

    componentDidMount() {
        fetch('/users')
            .then(res => res.json())
            .then(users => this.setState({ users }));
    }

    handleChange = (event) => {
        this.setState({newUser: {username: event.target.value}});
        event.preventDefault();
    };

    handleSubmit = (event) => {
        fetch('/users', {
            method: "POST",
            body: JSON.stringify(this.state.newUser),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(users => this.setState({ users }));
        event.preventDefault();
    };

    render() {
        return (
            <div className="App">
                <h1>Users</h1>
                {this.state.users.map(user =>
                    <div key={user.id}>{user.username}</div>
                )}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" onChange={this.handleChange}/>
                </form>
            </div>
        );
    }
}

export default App;
