// Initial state and actions

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

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Github Users
  const searchUsers = async text => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_USER_FINDER_ID}&client_secret=${process.env.REACT_APP_USER_FINDER_SECRET}`
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
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_USER_FINDER_ID}&client_secret=${process.env.REACT_APP_USER_FINDER_SECRET}`
    );

    // Runs after await
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  // Get Repos

  // CLear users from state
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading to gitHubReducer via dispatch
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      // Anything that needs to be avalible to children via Github context must be included here
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
