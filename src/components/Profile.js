import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Error from './Error';
import Loading from './Loading';
import {
  mdiAccountCircle,
  mdiAccountCheck,
  mdiAccountRemove,
  mdiCheckUnderlineCircle,
} from '@mdi/js';
import Icon from '@mdi/react';
import '../style/profile.css';

function Profile(props) {
  // props will be the user object from App
  const { user, signedInUser } = props;
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const { userid } = useParams();

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await axios(
          `https://odinbook-api-o1s1.onrender.com/api/users/${signedInUser.id}/requests`,
          {
            headers: {
              Authorization: signedInUser.token,
            },
          }
        );
        if (res.status === 200) {
          if (res.data.friend_requests.some((e) => e._id === user.id)) {
            setIsFollowing(true);
          } else {
            setIsFollowing(false);
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFollowers = async () => {
      try {
        const res = await axios(
          `https://odinbook-api-o1s1.onrender.com/api/users/${signedInUser.id}/friends`,
          {
            headers: {
              Authorization: signedInUser.token,
            },
          }
        );
        if (res.status === 200) {
          if (res.data.friends.some((e) => e._id === user.id)) {
            setIsFollowed(true);
          } else {
            setIsFollowed(false);
          }
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFollowers();
    fetchFollowing();
    user.id === signedInUser.id ? setIsOwner(true) : setIsOwner(false);
  }, []);

  async function handleclick() {
    setLoading(true);
    try {
      const res = await axios({
        method: 'put',
        url: `https://odinbook-api-o1s1.onrender.com/api/users/${userid}/requests`,
        data: {
          user1: signedInUser.id,
          user2: user.id,
        },
        headers: { Authorization: signedInUser.token },
      });
      if (res.data.message === 'Success') {
        setIsFollowing(!isFollowing);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className='profile-card'>
        <div className='profile-info-loading'>
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return <Error error={error} />;
  }

  if (isOwner) {
    return (
      <div className='profile-card'>
        <Link to={`/profile/${user.id}`}>
          <div className='profile-info'>
            <Icon path={mdiAccountCircle} size={1} color='white' />
            <p>{user.name.first}</p>
            <p>{user.name.last}</p>
          </div>
        </Link>
        <p style={{ fontSize: '.8rem' }}>your account</p>
      </div>
    );
  }

  return (
    <div className='profile-card'>
      <Link to={`/profile/${user.id}`}>
        <div className='profile-info'>
          <Icon path={mdiAccountCircle} size={1} color='white' />
          <p>{user.name.first}</p>
          <p>{user.name.last}</p>
        </div>
      </Link>
      {isFollowing ? (
        <div className='profilecard-unfollow-btn' onClick={handleclick}>
          <p>Unfollow</p>
          <Icon path={mdiAccountRemove} size={1} color='white' />
        </div>
      ) : (
        <div className='profilecard-follow-btn' onClick={handleclick}>
          <p>Follow</p>
          <Icon path={mdiAccountCheck} size={1} color='white' />
        </div>
      )}
      {isFollowed ? (
        <div className='profile-follow-status-container'>
          <p className='profile-follow-status'>following you</p>
          <Icon path={mdiCheckUnderlineCircle} size={0.75} color='white' />
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
