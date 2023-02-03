import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Profile from './Profile';

function Followers(props) {
  // followers is an array of objects with _id vlaue and name object
  const { followers, signedInUser } = props;
  const { userid } = useParams();
  const [showComponent, setShowComponet] = useState(false);

  useEffect(() => {
    setShowComponet(false);
  }, [userid]);

  function handleclick() {
    setShowComponet(!showComponent);
  }

  if (followers.length === 0) {
    return (
      <div className='followers-container'>
        <h3>Followers {followers.length}</h3>
      </div>
    );
  } else {
    return (
      <div className='followers-container'>
        <h3 onClick={handleclick}>Followers {followers.length}</h3>
        {!showComponent
          ? null
          : followers.map((follower) => {
              return (
                <div className='follower-profile' key={follower._id}>
                  <Profile
                    user={{
                      name: {
                        first: follower.name.first,
                        last: follower.name.last,
                      },
                      id: follower._id,
                    }}
                    signedInUser={signedInUser}
                  />
                </div>
              );
            })}
      </div>
    );
  }
}

export default Followers;
