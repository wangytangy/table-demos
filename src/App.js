import React, { Component } from 'react';
import './assets/css/default.min.css';
import { getUsers } from './actions/index';

class App extends Component {
  state = {users: []}

  componentDidMount() {
    getUsers().then((users) => this.setState({users}))
  }

  render() {
    return (
      <div className="App">
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default App;
