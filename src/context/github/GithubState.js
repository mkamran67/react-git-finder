// Initial state and actions
// All actions will go here

import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_USER_FINDER_ID;
  githubClientSecret = process.env.REACT_APP_USER_FINDER_SECRET;
} else {
  githubClientId = process.env.USER_FINDER_ID;
  githubClientSecret = process.env.USER_FINDER_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };
  // useReducer hook
  // useReducer returns (deconstructs) state and dispatch.
  // It accepts a reducer and initialState. GithubReducer in this case is our reducer, which accepts a type and possible payload
  // Dispatch must have a type else it'll return the default state.

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Github Users
  const searchUsers = async text => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    // sends type + payload to gitHubReducer via dispatch
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };
  //Get a single Github User
  const getUser = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    // Runs after await
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  // Get Repos
  const getUserRepos = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    );

    // Runs after await
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // CLear users from state
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading to gitHubReducer via dispatch
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      // Anything that needs to be avalible to children via GithubContext must be included here
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children} {/* becuase we are gonna wrap the entire app */}
    </GithubContext.Provider>
  );
};

export default GithubState;
