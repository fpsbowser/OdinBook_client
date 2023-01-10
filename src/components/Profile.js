import React from 'react';
import { Link } from 'react-router-dom';

function Profile(props) {
  // props will be the user object from App
  const { user } = props;
  return (
    <Link to={`/profile/${user.id}`}>
      <div>
        <h2>Profile Card</h2>
        <p>{user.name.first}</p>
        <p>{user.name.last}</p>
        <p>{user.email}</p>
      </div>
    </Link>
  );
}

export default Profile;
