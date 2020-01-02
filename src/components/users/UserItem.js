import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Changed to a functional component, destructuring the incoming prop
const UserItem = ({ user: { avatar_url, html_url, login } }) => {
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>
      <div>
        <Link
          to={`/user/${login}`}
          rel='noopener noreferrer'
          className='btn btn-dark btn-sm my-1'
        >
          More
        </Link>
      </div>
    </div>
  );
};

// This is Reacts way of checking for errors, it's not necessary but good practice.
// Doing this here is basically making sure prop of type "user" is being passed in aka required.
UserItem.propTypes = {
  user: PropTypes.object.isRequired
};
export default UserItem;
