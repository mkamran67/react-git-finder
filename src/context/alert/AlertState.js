// Initial state and actions
// All actions will go here

import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = props => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };

  return (
    <AlertContext.Provider
      // Anything that needs to be avalible to children via GithubContext must be included here
      value={{
        alert: state,
        setAlert
      }}
    >
      {props.children} {/* becuase we are gonna wrap the entire app */}
    </AlertContext.Provider>
  );
};

export default AlertState;
