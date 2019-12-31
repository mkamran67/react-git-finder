import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

import './App.css';
import axios from 'axios';

// Must extend React.Component ^^ imported above
class App extends Component {
  state = {
    users: [],
    loading: false
  };
  async componentDidMount() {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_USER_FINDER_ID}&client_secret=${process.env.REACT_APP_USER_FINDER_SECRET}`
    );

    // Runs after await
    this.setState({ users: res.data, loading: false });
  }

  // Render method is required, life cycle method
  render() {
    return (
      <div className='App'>
        <Navbar title='Github Finder' githubIcon='fab fa-github' />
        <div className='container'>
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;
