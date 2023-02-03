import React from 'react';
import { Link } from 'react-router-dom';

function Post(props) {
  const { post } = props;

  return (
    <div className='post'>
      <Link to={`/profile/${post.owner._id}`}>
        <h1>
          {post.owner.name.first} {post.owner.name.last}
        </h1>
      </Link>
      <Link to={`/profile/${post.owner._id}/posts/${post._id}`}>
        <p>{post.post}</p>
        <p>[likes-logo-placeholder]: {post.likes.length}</p>
        <p>[comment-logo-placeholder]: {post.comments.length}</p>
      </Link>
    </div>
  );
}

export default Post;
