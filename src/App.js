import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

import './App.css';
import axios from 'axios';

// Must extend React.Component ^^ imported above
class App extends Component {
  async componentDidMount() {
    const res = await axios.get('https://api.github.com/users');

    console.log(res.data);
  }

  // Render method is required, life cycle method
  render() {
    return (
      <div className='App'>
        <Navbar title='Github Finder' githubIcon='fab fa-github' />
        <div className='container'>
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
