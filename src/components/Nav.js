import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiBookOpenVariant, mdiAccount, mdiLogoutVariant } from '@mdi/js';
import '../style/nav.css';

function Nav(props) {
  const { loggedInUser, handlelogout } = props;

  if (loggedInUser) {
    return (
      <div className='nav-container'>
        <Link to={`/profile/${loggedInUser.id}`}>
          <div className='nav-item'>
            <Icon path={mdiAccount} size={1.5} />
          </div>
        </Link>
        <Link to={'/'}>
          <div className='nav-item odinbook-logo'>
            <p>ODIN-</p>
            <Icon path={mdiBookOpenVariant} size={1.5} />
          </div>
        </Link>
        <Link>
          <div className='nav-item'>
            <Icon path={mdiLogoutVariant} size={1.5} onClick={handlelogout} />
          </div>
        </Link>
      </div>
    );
  }
}

export default Nav;
