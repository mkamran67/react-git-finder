// Reducer handles incoming data from actions (GithubState) and returns a new state.
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

// reducers is just a function that returns new state
// reducer mush have an incoming type
export default (state, action) => {
  // incoming dispatched sets have a type and a possible payload

  switch (action.type) {
    case GET_USER: {
      return {
        ...state, // state is immutable, so we copy it
        user: action.payload,
        loading: false
      };
    }
    case GET_REPOS: {
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    }
    case CLEAR_USERS: {
      return {
        ...state, // state is immutable, so we copy it
        users: [],
        loading: false
      };
    }
    case SEARCH_USERS: {
      return {
        ...state, // state is immutable, so we copy it
        users: action.payload,
        loading: false
      };
    }
    case SET_LOADING: {
      return {
        ...state, // state is immutable, so we copy it
        loading: true
      };
    }

    default: {
      return state;
    }
  }
};
