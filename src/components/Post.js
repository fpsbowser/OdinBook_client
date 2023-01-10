import React from 'react';
import { Link } from 'react-router-dom';

function Post(props) {
  const { post } = props;

  console.log(post);
  return (
    <div className='post'>
      <Link
        to={`/profile/${post.owner._id}`}
        // state={{ userid: post.owner._id }}
      >
        <h1>Owner: {post.owner.name.first}</h1>
      </Link>
      <p>{post.post}</p>
    </div>
  );
}

export default Post;
