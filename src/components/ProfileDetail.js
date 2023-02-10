import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Followers from './Followers';
import ProfilePosts from './ProfilePosts';
import Error from './Error';
import Following from './Following';
import {
  mdiAccountCircle,
  mdiAccountCheck,
  mdiAccountRemove,
  mdiCheckUnderlineCircle,
} from '@mdi/js';
import Icon from '@mdi/react';
import '../style/profiledetail.css';

function ProfileDetail(props) {
  const { currentUser } = props;
  const [posts, setPosts] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState([]);
  const { userid } = useParams();

  useEffect(() => {
    fetchUserDetail();
    if (currentUser) {
      currentUser.id === userid ? setIsOwner(true) : setIsOwner(false);
    }
  }, [userid]);

  const fetchUserDetail = async () => {
    try {
      const res = await axios(`http://localhost:4000/api/users/${userid}`, {
        headers: { Authorization: currentUser.token },
      });
      if (res.data.error) {
        console.log('fetchuser error');
        setError(res.data.error);
      }
      setUserDetail(res.data);
      setFollowing(res.data.friend_requests);
      setFollowers(res.data.friends);
      setPosts(res.data.posts);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  async function handleclick() {
    setLoading(true);
    try {
      const res = await axios({
        method: 'put',
        url: `http://localhost:4000/api/users/${userid}/requests`,
        data: {
          user1: currentUser.id,
          user2: userid,
        },
        headers: { Authorization: currentUser.token },
      });
      if (res.status === 200) {
        // update user
        console.log(res);
        fetchUserDetail();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  if (!currentUser) {
    return <Navigate to={'/login'} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (isOwner) {
    return (
      <div className='profile-detail-container'>
        <div className='profile-header-container'>
          <div className='profile-header'>
            <div className='profile-banner'>
              <Icon path={mdiAccountCircle} size={2} color='white' />
              <p className='profile-detail-name-text'>
                {userDetail.name.first} {userDetail.name.last}
              </p>
            </div>
            <p className='profile-email-text'>{userDetail.email}</p>
          </div>
        </div>
        <div className='following-followers-container'>
          <Following following={following} signedInUser={currentUser} />
          <Followers followers={followers} signedInUser={currentUser} />
        </div>
        <ProfilePosts posts={posts} currentUser={currentUser} />
      </div>
    );
  } else {
    return (
      <div className='profile-detail-container'>
        <div className='profile-header-container'>
          <div className='profile-header'>
            <div className='profile-banner'>
              <Icon path={mdiAccountCircle} size={2} color='white' />
              <p className='profile-detail-name-text'>
                {userDetail.name.first} {userDetail.name.last}
              </p>
            </div>
            <p className='profile-email-text'>{userDetail.email}</p>
          </div>
          {followers.some((userobj) => userobj._id === currentUser.id) ? (
            <div className='follow-options'>
              <div className='profile-unfollow-btn' onClick={handleclick}>
                <p>Unfollow</p>
                <Icon path={mdiAccountRemove} size={1} color='white' />
              </div>
            </div>
          ) : (
            <div className='follow-options'>
              <div className='profile-follow-btn' onClick={handleclick}>
                <p>Follow</p>
                <Icon path={mdiAccountCheck} size={1} color='white' />
              </div>
            </div>
          )}
          {following.some((user) => user._id === currentUser.id) ? (
            <div className='follow-status'>
              <p>following you</p>
              <Icon path={mdiCheckUnderlineCircle} size={1} color='white' />
            </div>
          ) : null}
        </div>
        <div className='following-followers-container'>
          <Following following={following} signedInUser={currentUser} />
          <Followers followers={followers} signedInUser={currentUser} />
        </div>
        <ProfilePosts posts={posts} currentUser={currentUser} />
      </div>
    );
  }
}

export default ProfileDetail;
