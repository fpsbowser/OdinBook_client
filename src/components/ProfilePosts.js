import React from 'react';
import { Link } from 'react-router-dom';

function ProfilePosts(props) {
  const { posts, user } = props;
  let name = '';

  if (posts.length === 0) {
    return <h1>No posts!</h1>;
  } else {
    posts[0].owner === user.id
      ? (name = 'Your')
      : (name = `${posts[0].owner.name.first}'s`);
    return (
      <div className='profile-posts-container'>
        <h2>{name} posts:</h2>
        {posts.map((post) => {
          return (
            <Link
              to={`/profile/${post.owner._id}/posts/${post._id}`}
              key={post._id}
            >
              <div className='profile-post'>
                <p className='post-text'>{post.post}</p>
                <p>Likes: {post.likes.length}</p>
                <p>Comments: {post.comments.length}</p>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default ProfilePosts;
