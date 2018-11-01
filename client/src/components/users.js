import React, { Component } from 'react';
import './users.css';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    fetch('/api/users')
      .then(res => res.json())
      .then(users => this.setState({users}, () => console.log('Users fetched...', users)));
  }

  render() {
    return (
      <div>
        <h3>Users from Azure Database({this.state.users.length}): </h3>
        <ul>
        {this.state.users.map(users => 
          <li key={users.id}>{users.firstName} {users.lastName}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Users;
