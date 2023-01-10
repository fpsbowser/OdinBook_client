import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Friend from './Friend';
import Requests from './Requests';
import ProfilePosts from './ProfilePosts';
import Error from './Error';

function ProfileDetail(props) {
  const { user } = props;
  const [posts, setPosts] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userid } = useParams();

  useEffect(() => {
    fetchUserDetail();
  }, [userid]);

  const fetchUserDetail = async () => {
    try {
      const res = await axios(`http://localhost:4000/api/users/${userid}`, {
        headers: { Authorization: user.token },
      });
      if (res.data.error) {
        console.log('yeet');
        setError(res.data.error);
      }
      setUserDetail(res.data);
      setFriends(res.data.friends);
      setPosts(res.data.posts);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(userDetail);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className='profile-detail-container'>
      <div className='friends-container'>
        <Friend friends={friends} />
      </div>
      <div className='profile-header-container'>
        <h2>Profile DETAIL</h2>
        <p>{userDetail.name.first}</p>
        <p>{userDetail.name.last}</p>
        <p>{userDetail.email}</p>
      </div>
      <div className='profile-posts-container'>
        <ProfilePosts posts={posts} user={userDetail} />
      </div>
      <div className='friend-requests-container'>
        {userid === user.id ? <Requests user={userDetail} /> : null}
      </div>
    </div>
  );
}

export default ProfileDetail;
