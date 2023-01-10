import React from 'react';

function Friend(props) {
  const { friends } = props;

  if (friends.length === 0) {
    return <h1>No friends</h1>;
  } else {
    return (
      <div className='friends-container'>
        <h2>Friends</h2>
        {friends.map((ele) => {
          // friend component card???
          return <h1 key={ele}> id: {ele}</h1>;
        })}
      </div>
    );
  }
}

export default Friend;
