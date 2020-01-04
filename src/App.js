import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import './App.css';
import axios from 'axios';
import User from './components/users/User';

// Must extend React.Component ^^ imported above
class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
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

  //Get a single Github User
  getUser = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_USER_FINDER_ID}&client_secret=${process.env.REACT_APP_USER_FINDER_SECRET}`
    );

    // Runs after await
    this.setState({ user: res.data, loading: false });
  };

  getUserRepos = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_USER_FINDER_ID}&client_secret=${process.env.REACT_APP_USER_FINDER_SECRET}`
    );

    // Runs after await
    this.setState({ repos: res.data, loading: false });
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

    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  // Render method, life cycle method
  render() {
    // Destructuring
    const { repos, user, users, loading } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar title='Github Finder' githubIcon='fab fa-github' />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    user={user}
                    loading={loading}
                    getUserRepos={this.getUserRepos}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
