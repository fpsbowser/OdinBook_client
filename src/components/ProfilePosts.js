import React from 'react';

function ProfilePosts(props) {
  const { posts, user } = props;
  let name = '';

  console.log(posts);
  console.log(user);
  if (posts.length === 0) {
    return <h1>No posts!</h1>;
  } else {
    posts[0].owner !== user._id
      ? (name = 'Your')
      : (name = `${user.name.first}'s`);
    console.log(name);
    return (
      <div className='profile-posts-container'>
        <h2>{name} posts:</h2>
        {posts.map((post) => {
          return <p key={post._id}>{post.post}</p>;
        })}
      </div>
    );
  }
}

export default ProfilePosts;
