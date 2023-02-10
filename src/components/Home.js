import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Post from './Post';
import Error from './Error';
import PostCompose from './PostCompose';
import '../style/home.css';

function Home(props) {
  const { loggedInUser } = props;
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios('http://localhost:4000/api/posts', {
        headers: { Authorization: loggedInUser.token },
      });
      const arr = [];
      Object.keys(res.data).forEach((key) => {
        arr.push(res.data[key]);
      });
      setPosts(arr);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (!loggedInUser) {
    return <Navigate to={'/login'} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error && error.response.status === 401) {
    return <Error error={error} />;
  }
  return (
    <div className='home-container'>
      <PostCompose user={loggedInUser} fetchPosts={fetchPosts} />
      {posts.map((post) => {
        return <Post post={post} user={loggedInUser} key={post._id} />;
      })}
    </div>
  );
}

export default Home;
