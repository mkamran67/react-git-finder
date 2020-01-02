import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Changed to a functional component
const Navbar = ({ githubIcon, title }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={githubIcon} /> {title}
      </h1>

      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'Github Finder',
  githubIcon: 'fab fa-github'
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  githubIcon: PropTypes.string.isRequired
};

export default Navbar;
