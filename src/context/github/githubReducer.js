import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

// reducers is just a function that sets states
export default (state, action) => {
  // incoming dispatched sets have a type and a possible payload

  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    }

    case CLEAR_USERS: {
      return {
        ...state,
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
      break;
    }
  }
};
