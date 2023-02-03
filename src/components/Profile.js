import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Error from './Error';
import Loading from './Loading';

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
          `http://localhost:4000/api/users/${signedInUser.id}/requests`,
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
          `http://localhost:4000/api/users/${signedInUser.id}/friends`,
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
        url: `http://localhost:4000/api/users/${userid}/requests`,
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
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (isOwner) {
    return (
      <div className='profile-card'>
        <Link to={`/profile/${user.id}`}>
          <p>[avatar-placeholder]</p>
          <p>{user.name.first}</p>
          <p>{user.name.last}</p>
        </Link>
        <p>your account</p>
      </div>
    );
  }

  return (
    <div className='profile-card'>
      <Link to={`/profile/${user.id}`}>
        <p>[avatar-placeholder]</p>
        <p>{user.name.first}</p>
        <p>{user.name.last}</p>
      </Link>
      {isFollowing ? (
        <div className='follow-btn-container'>
          <button onClick={handleclick}>Unfollow</button>
        </div>
      ) : (
        <div className='follow-btn-container'>
          <button onClick={handleclick}>follow</button>
        </div>
      )}
      {isFollowed ? <p>following you</p> : null}
    </div>
  );
}

export default Profile;
