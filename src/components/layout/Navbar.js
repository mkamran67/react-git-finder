import React from 'react';
import PropTypes from 'prop-types';

// Changed to a functional component
const Navbar = ({ githubIcon, title }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className={githubIcon} /> {title}
      </h1>
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
