import React from 'react';
import { Link, Navigate } from 'react-router-dom';

function Nav(props) {
  const { loggedInUser, handlelogout } = props;

  if (loggedInUser) {
    return (
      <div className='nav-container'>
        <Link to={'/'}>
          <button>Home</button>
        </Link>
        <Link to={`/profile/${loggedInUser.id}`}>
          <button>Profile</button>
        </Link>
        <button onClick={handlelogout}>Logout</button>
      </div>
    );
  }
}

export default Nav;
