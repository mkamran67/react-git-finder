import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

import './App.css';
import axios from 'axios';

// Must extend React.Component ^^ imported above
class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  // Searches on load for 30 users (default by Github API)
  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_USER_FINDER_ID}&client_secret=${process.env.REACT_APP_USER_FINDER_SECRET}`
  //   );

  //   // Runs after await
  //   this.setState({ users: res.data, loading: false });
  // }

  // Search Github Users
  searchUsers = async text => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_USER_FINDER_ID}&client_secret=${process.env.REACT_APP_USER_FINDER_SECRET}`
    );

    // Runs after await
    this.setState({ users: res.data.items, loading: false });
  };

  // CLear users from state
  clearUsers = () => {
    this.setState({
      users: [],
      loading: false
    });
  };

  // set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
  };

  // Render method, life cycle method
  render() {
    // Destructuring
    const { users, loading } = this.state;

    return (
      <div className='App'>
        <Navbar title='Github Finder' githubIcon='fab fa-github' />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
