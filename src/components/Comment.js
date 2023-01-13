import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Comment(props) {
  const { comment } = props;
  const [commentLikesVisable, setCommentLikesVisable] = useState(false);

  console.log(comment);
  return (
    <div className='comment-container'>
      <div className='comment-profile'>
        <p>[logo-placeholder]</p>
        <Link to={`/profile/${comment.owner._id}`}>
          <h2 className='profile-text'>
            {comment.owner.name.first} {comment.owner.name.last}
          </h2>
        </Link>
        <p className='comment-text'>{comment.comment}</p>
        <p
          className='comment-likes'
          onClick={() => {
            setCommentLikesVisable(!commentLikesVisable);
          }}
        >
          LIKES: {comment.likes.length} eye-icon to view likers
        </p>
        <div className='likers-container' id='likers-container'>
          <ul>
            {!commentLikesVisable
              ? null
              : comment.likes.map((like) => {
                  return (
                    <Link to={`/profile/${like._id}`} key={like._id}>
                      <li>
                        {like.name.first} {like.name.last}
                      </li>
                    </Link>
                  );
                })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Comment;
