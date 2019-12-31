import React, { Fragment } from 'react';
import spinner from './spinner.gif'; //

const Spinner = () => {
  return (
    <Fragment>
      <img src={spinner} alt='loading...' style={spinnerStyles} />
    </Fragment>
  );
};

const spinnerStyles = {
  width: '200px',
  margin: 'auto',
  display: 'block'
};

// For funcational components exporting down below is better
export default Spinner;
