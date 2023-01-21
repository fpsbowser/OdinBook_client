import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Comment(props) {
  const { comment, user, fetchPostComments } = props;
  const [commentLikesVisable, setCommentLikesVisable] = useState(false);
  const [likes, setLikes] = useState(0);
  const { postid } = useParams();

  async function handlelike(e) {
    // update comment to add user.id to likes array
    try {
      const res = await axios({
        method: 'put',
        url: `http://localhost:4000/api/posts/${postid}/comments/${comment._id}/likes`,
        data: {
          user: user.id,
        },
      });
      if (res.status === 200) {
        // update comments
        fetchPostComments();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  async function handledelete() {
    console.log('Delete comment with id: ' + comment._id);
    try {
      const res = await axios({
        method: 'delete',
        url: `http://localhost:4000/api/posts/${postid}/comments/${comment._id}`,
        headers: { Authorization: user.token },
      });
      if (res.status === 200) {
        // update comments
        fetchPostComments();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

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
        <p className='comment-like-btn' onClick={handlelike}>
          [like-btn-placeholder]
        </p>
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
        <div className='modify-comment-container'>
          {comment.owner._id !== user.id ? null : (
            <button className='comment-delete-btn' onClick={handledelete}>
              Delete Comment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
