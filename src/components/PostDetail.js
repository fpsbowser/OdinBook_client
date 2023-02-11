import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Comment from './Comment';
import Error from './Error';
import { Link } from 'react-router-dom';
import CommentCompose from './CommentCompose';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiThumbUp, mdiDelete } from '@mdi/js';
import '../style/postdetail.css';

function PostDetail(props) {
  const { loggedInUser } = props;
  const [comments, setComments] = useState([]);
  const [postDetail, setPostDetail] = useState(null);
  const [likes, setLikes] = useState([]);
  const [postLikesVisable, setPostLikesVisable] = useState(false);
  const [error, setError] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [redirectUser, setRedirectUser] = useState(false);
  const { postid } = useParams();

  useEffect(() => {
    if (loggedInUser) {
      fetchPostDetail();
      fetchPostComments();
    }
  }, [postid]);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const fetchPostDetail = async () => {
    try {
      const res = await axios(
        `https://odinbook-api-ks88.onrender.com/api/posts/${postid}`,
        {
          headers: { Authorization: loggedInUser.token },
        }
      );
      if (res.data.error) {
        console.log('error fecthing post detail');
        return setError(res.data.error);
      }
      res.data.owner._id === loggedInUser.id
        ? setIsOwner(true)
        : setIsOwner(false);
      setPostDetail(res.data);
      setLikes(res.data.likes);
    } catch (err) {
      setError(err);
    } finally {
      setPostLoading(false);
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios(
        `https://odinbook-api-ks88.onrender.com/api/posts/${postid}/comments`,
        {
          headers: { Authorization: loggedInUser.token },
        }
      );
      if (res.data.error) {
        setError(res.data);
      }
      setComments(res.data);
    } catch (err) {
      console.log(`error fetching comments: ${err}`);
      setError(err);
    } finally {
      setCommentsLoading(false);
    }
  };
  //   console.log(postDetail);
  async function handledelete() {
    console.log(`remove post with id: ${postDetail._id}`);
    try {
      const res = await axios({
        method: 'delete',
        url: `https://odinbook-api-ks88.onrender.com/api/posts/${postDetail._id}`,
        headers: { Authorization: loggedInUser.token },
      });
      if (res.status === 200) {
        // Redirect user
        setRedirectUser(!redirectUser);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }

  async function handlelike(e) {
    // update post to add user.id to likes array
    try {
      const res = await axios({
        method: 'put',
        url: `https://odinbook-api-ks88.onrender.com/api/posts/${postid}`,
        data: {
          post: postDetail.post,
          like: loggedInUser.id,
        },
        headers: { Authorization: loggedInUser.token },
      });
      if (res.status === 200) {
        // update comments
        fetchPostDetail();
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  if (!loggedInUser) {
    return <Navigate to={'/login'} />;
  }

  if (error) {
    return <Error error={error} />;
  }

  if (redirectUser) {
    return <Navigate to={`/profile/${loggedInUser.id}`} />;
  }

  return (
    <div className='post-detail-container'>
      {postLoading ? (
        <Loading />
      ) : (
        <div className='post-container'>
          <Link
            to={`/profile/${postDetail.owner._id}`}
            style={{ textDecoration: 'none' }}
          >
            <div className='post-header-container'>
              <div className='post-header'>
                <Icon path={mdiAccountCircle} size={1.5} />
                <h1 className='post-header-text'>
                  {postDetail.owner.name.first} {postDetail.owner.name.last}
                </h1>
              </div>
              <div className='timestamp-container'>
                <p className='timestamp-text'>
                  {new Date(postDetail.timestamp).toLocaleDateString(
                    'en-US',
                    options
                  )}
                </p>
              </div>
            </div>
          </Link>
          <p className='post-text'>{postDetail.post}</p>
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
                  setPostLikesVisable(!postLikesVisable);
                }}
              >
                {postDetail.likes.length}
              </p>
            </div>
            <div className='modify-post-container'>
              {isOwner ? null : (
                <Icon
                  path={mdiDelete}
                  size={1.2}
                  color='white'
                  onClick={handledelete}
                />
              )}
            </div>
          </div>
          <div className='likers-container'>
            {!postLikesVisable
              ? null
              : likes.map((like) => {
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
      )}
      {commentsLoading ? (
        <Loading />
      ) : (
        <div className='postdetail-comments-container'>
          <h2 className='postdetail-comment-header'>Comments</h2>
          <CommentCompose
            user={loggedInUser}
            fetchPostComments={fetchPostComments}
          />
          {comments.map((comment) => {
            return (
              <Comment
                key={comment._id}
                comment={comment}
                user={loggedInUser}
                fetchPostComments={fetchPostComments}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PostDetail;
