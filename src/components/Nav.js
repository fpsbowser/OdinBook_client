import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import authService from '../services/auth.service';

function Nav(props) {
  const { user } = props;
  console.log(user);
  return (
    <div className='nav-container'>
      <ul>
        <Link to={'/'}>
          <li>Home</li>
        </Link>
        {!user ? (
          <Link to={'/login'}>
            <li>Login/Sign-Up</li>
          </Link>
        ) : null}
        {user ? (
          <Link to={'/profile/' + user.id}>
            <li>Profile</li>
          </Link>
        ) : null}
        {user ? (
          <Link>
            <li
              onClick={() => {
                authService.logout();
                <Navigate to={'/login'} />;
              }}
            >
              Logout
            </li>
          </Link>
        ) : null}
      </ul>
    </div>
  );
}

export default Nav;
