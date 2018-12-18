import React, { Component } from 'react';
import logo from './logo.svg';
import jhawk from './jhawk.png';
import './App.css';
import Users from './components/users';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={jhawk} className="App-KU" alt="jhawk" />
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">ReactDB</h1>
          <h2>React + Express + Azure</h2>
        </header>
        <Users />
      </div>
    );
  }
}

export default App;
