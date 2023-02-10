import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import '../style/commentcompose.css';

function CommentCompose(props) {
  const { user, fetchPostComments } = props;
  const [comment, setComment] = useState({
    comment: '',
    owner: user.id,
    likes: [],
    timestamp: new Date(),
  });
  const [error, setError] = useState(null);
  const [postRequestLoading, setPostRequestLoading] = useState(false);
  const { postid } = useParams();

  async function onSubmit(e) {
    e.preventDefault();

    const headers = {
      'content-type': 'application/json',
      Authorization: user.token,
    };

    try {
      const res = await axios({
        method: 'post',
        url: `https://odinbook-api-o1s1.onrender.com/api/posts/${postid}/comments`,
        headers: headers,
        data: comment,
      });
      console.log(res);
      if (res.data.message === 'Success') {
        // Refresh comments
        fetchPostComments();
        setComment({
          ...comment,
          comment: '',
        });
      }
      if (res.data.errors) {
        const errors = res.data.errors;
        console.log('Backend validation errors exist: ');
        errors.forEach((err) => {
          console.log(err.msg);
        });
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setPostRequestLoading(false);
    }
  }

  function handleChange(e) {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className='compose-comment-container'>
      {postRequestLoading ? (
        <Loading />
      ) : (
        <form onSubmit={onSubmit} className='compose-comment-form'>
          <textarea
            name='comment'
            id='comment-textarea'
            maxLength={'120'}
            value={comment.comment}
            onChange={handleChange}
            placeholder={'Add a comment!'}
          ></textarea>
          <button id='comment-submit-btn' type='submit'>
            Add Comment
          </button>
        </form>
      )}
    </div>
  );
}

export default CommentCompose;
