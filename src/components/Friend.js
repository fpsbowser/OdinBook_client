import React from 'react';
import { Link } from 'react-router-dom';

function Friend(props) {
  const { friends } = props;

  if (friends.length === 0) {
    return <h1>No friends</h1>;
  } else {
    return (
      <div className='friends-container'>
        <h2>Friends</h2>
        {friends.map((friend) => {
          return (
            <Link to={`/profile/${friend._id}`} key={friend._id}>
              <div className='friend-card'>
                <div className='name-container'>
                  <h1 className='name-text'>
                    {friend.name.first} {friend.name.last}
                  </h1>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Friend;
