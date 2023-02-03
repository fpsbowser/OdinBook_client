import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Profile from './Profile';

function Following(props) {
  const { following, signedInUser } = props;
  const { userid } = useParams();
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setShowComponent(false);
  }, [userid]);

  function handleclick() {
    setShowComponent(!showComponent);
  }

  if (following.length === 0) {
    return <h3>Following {following.length}</h3>;
  } else {
    return (
      <div className='following-container'>
        <h3 onClick={handleclick}>Following {following.length}</h3>
        {!showComponent
          ? null
          : following.map((following) => {
              return (
                <div className='following-profile' key={following._id}>
                  <Profile
                    user={{
                      name: {
                        first: following.name.first,
                        last: following.name.last,
                      },
                      id: following._id,
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

export default Following;
