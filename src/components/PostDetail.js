import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Comment from './Comment';
import Error from './Error';
import { Link } from 'react-router-dom';
import CommentCompose from './CommentCompose';

function PostDetail(props) {
  const { user } = props;
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
    fetchPostDetail();
    fetchPostComments();
  }, [postid]);

  //   console.log(user, postid);

  const fetchPostDetail = async () => {
    try {
      const res = await axios(`http://localhost:4000/api/posts/${postid}`, {
        headers: { Authorization: user.token },
      });
      if (res.data.error) {
        console.log('error fecthing post detail');
        return setError(res.data.error);
      }
      res.data.owner._id === user.id ? setIsOwner(true) : setIsOwner(false);
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
        `http://localhost:4000/api/posts/${postid}/comments`,
        {
          headers: { Authorization: user.token },
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
        url: `http://localhost:4000/api/posts/${postDetail._id}`,
        headers: { Authorization: user.token },
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

  if (error) {
    return <Error error={error} />;
  }

  if (redirectUser) {
    return <Navigate to={`/profile/${user.id}`} />;
  }

  return (
    <div className='post-detail-container'>
      {postLoading ? (
        <Loading />
      ) : (
        <div className='post-detail-container'>
          <div className='post-owner-header'>
            <p>[user-logo-placeholder]</p>
            <Link to={`/profile/${postDetail.owner._id}`}>
              <h2 className='owner-header-text'>
                {postDetail.owner.name.first} {postDetail.owner.name.last}
              </h2>
            </Link>
          </div>
          <div className='post-container'>
            <p className='post-text'>{postDetail.post}</p>
          </div>
          <div className='modify-post-container'>
            {!isOwner ? null : (
              <button className='post-delete-btn' onClick={handledelete}>
                Delete
              </button>
            )}
          </div>
          <div className='likers-container' id='likers-container'>
            <p
              onClick={() => {
                setPostLikesVisable(!postLikesVisable);
              }}
            >
              {likes.length} Likes [eye-icon]
            </p>
            <ul>
              {!postLikesVisable
                ? null
                : likes.map((like) => {
                    return (
                      <Link to={`/profile/${like._id}`} key={like._id}>
                        <li>
                          {like.name.first} {like.name.last}
                        </li>
                      </Link>
                    );
                  })}
            </ul>
          </div>
        </div>
      )}
      {commentsLoading ? (
        <Loading />
      ) : (
        <div className='comment-container'>
          <div className='comments'>
            <h2>comments</h2>
            {comments.map((comment) => {
              return (
                <Comment
                  key={comment._id}
                  comment={comment}
                  user={user}
                  fetchPostComments={fetchPostComments}
                />
              );
            })}
          </div>
          <CommentCompose user={user} fetchPostComments={fetchPostComments} />
        </div>
      )}
    </div>
  );
}

export default PostDetail;
