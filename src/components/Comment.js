import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { mdiAccountCircle, mdiThumbUp, mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import '../style/comment.css';

function Comment(props) {
  const { comment, user, fetchPostComments } = props;
  const [commentLikesVisable, setCommentLikesVisable] = useState(false);
  const { postid } = useParams();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  async function handlelike(e) {
    // update comment by pushing user.id to likes array
    try {
      const res = await axios({
        method: 'put',
        url: `https://odinbook-api-o1s1.onrender.com/api/posts/${postid}/comments/${comment._id}`,
        data: {
          comment: comment.comment,
          like: user.id,
        },
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

  async function handledelete() {
    console.log('Delete comment with id: ' + comment._id);
    try {
      const res = await axios({
        method: 'delete',
        url: `https://odinbook-api-o1s1.onrender.com/api/posts/${postid}/comments/${comment._id}`,
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

  //   console.log(comment);
  return (
    <div className='comment-container'>
      <div className='comment-header-container'>
        <Link to={`/profile/${comment.owner._id}`}>
          <div className='comment-owner-header'>
            <Icon path={mdiAccountCircle} size={1.5} color='white' />
            <h2 className='owner-header-text'>
              {comment.owner.name.first} {comment.owner.name.last}
            </h2>
          </div>
        </Link>
        <p className='timestamp-text'>
          {new Date(comment.timestamp).toLocaleDateString('en-US', options)}
        </p>
      </div>
      <p className='comment-text'>{comment.comment}</p>
      <div className='likes-modify-container'>
        <div className='likes-container'>
          <Icon
            path={mdiThumbUp}
            size={1}
            color={'white'}
            onClick={handlelike}
          />
          <p
            className='postdetail-likes-count'
            onClick={() => {
              setCommentLikesVisable(!commentLikesVisable);
            }}
          >
            {comment.likes.length}
          </p>
        </div>
        <div className='modify-comment-container'>
          {comment.owner._id !== user.id ? null : (
            <Icon
              path={mdiDelete}
              size={1.1}
              color={'white'}
              onClick={handledelete}
            />
          )}
        </div>
      </div>
      <div className='likers-container'>
        {!commentLikesVisable
          ? null
          : comment.likes.map((like) => {
              return (
                <Link to={`/profile/${like._id}`} key={like._id}>
                  <p className='liker-name'>
                    {like.name.first} {like.name.last}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
}

export default Comment;
