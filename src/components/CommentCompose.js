import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

function CommentCompose(props) {
  const { user } = props;
  const [componentShown, setComponentShown] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comment, setComment] = useState({
    comment: '',
    owner: user.id,
    likes: [],
    timestamp: new Date(),
  });
  const [error, setError] = useState(null);
  const [postRequestLoading, setPostRequestLoading] = useState(false);
  const { postid } = useParams();

  //   useEffect(() => {
  //     console.log(comment);
  //   });

  async function onSubmit(e) {
    e.preventDefault();
    // setComment({
    //   comment: commentText,
    //   owner: user.id,
    //   likes: [],
    //   timestamp: new Date(),
    // });

    const headers = {
      'content-type': 'application/json',
      Authorization: user.token,
    };

    try {
      const res = await axios({
        method: 'post',
        url: `http://localhost:4000/api/posts/${postid}/comments`,
        headers: headers,
        data: comment,
      });
      console.log(res);
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
      <p
        onClick={() => {
          setComponentShown(!componentShown);
        }}
      >
        [reply-logo-placeholder]
      </p>
      {!componentShown ? null : (
        <div className='comment-textare'>
          {postRequestLoading ? (
            <Loading />
          ) : (
            <form onSubmit={onSubmit} id='compose-form'>
              <textarea
                name='comment'
                id='comment-textarea'
                maxLength={'160'}
                value={comment.comment}
                onChange={handleChange}
                placeholder={'surely your twot will be necessary, right?'}
              ></textarea>
              <button id='tweet-submit' type='submit'>
                Submit
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default CommentCompose;
