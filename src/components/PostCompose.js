import React, { useState } from 'react';
import axios from 'axios';
import Loading from './Loading';
import '../style/postcompose.css';

function PostCompose(props) {
  const { user, fetchPosts } = props;
  const [post, setPost] = useState({
    owner: user.id,
    post: '',
  });
  const [error, setError] = useState(null);
  const [postRequestLoading, setPostRequestLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setPostRequestLoading(true);

    const headers = {
      'content-type': 'application/json',
      Authorization: user.token,
    };

    try {
      const res = await axios({
        method: 'post',
        url: `https://odinbook-api-ks88.onrender.com/api/posts/`,
        headers: headers,
        data: {
          post: post.post,
          owner: user.id,
        },
      });
      console.log(res);
      if (res.data.message === 'Success') {
        // Refresh posts
        console.log('SUCCESS');
        fetchPosts();
        setPost({
          owner: user.id,
          post: '',
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
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className='compose-post-container'>
      {postRequestLoading ? (
        <Loading />
      ) : (
        <form onSubmit={onSubmit} className='compose-post-form'>
          <textarea
            name='post'
            id='post-textarea'
            maxLength={'200'}
            value={post.post}
            onChange={handleChange}
            placeholder={`What's on your mind?`}
          ></textarea>
          <button id='post-submit-btn' type='submit'>
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default PostCompose;
