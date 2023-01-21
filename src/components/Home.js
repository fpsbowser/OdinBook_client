import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Profile from './Profile';
import Post from './Post';
import Error from './Error';
import PostCompose from './PostCompose';

function Home(props) {
  const { user, handlelogout } = props;
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(user);
  // fetch posts
  const fetchPosts = async () => {
    try {
      const res = await axios('http://localhost:4000/api/posts', {
        headers: { Authorization: user.token },
      });
      const arr = [];
      Object.keys(res.data).forEach((key) => {
        arr.push(res.data[key]);
      });
      setPosts(arr);
      // console.log(arr);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <Navigate to={'/login'} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error && error.response.status === 401) {
    return <Error error={error} />;
  }
  return (
    <div>
      <h1>Home</h1>
      <div className='posts-container'>
        <div className='compose-post-container'>
          <PostCompose user={user} fetchPosts={fetchPosts} />
        </div>
        {posts.map((post) => {
          return <Post post={post} user={user} key={post._id} />;
        })}
      </div>
      <button onClick={handlelogout}>Logout</button>
      <Profile user={user} />
    </div>
  );
}

export default Home;
