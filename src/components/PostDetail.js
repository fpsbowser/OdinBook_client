import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import Comment from './Comment';
import Error from './Error';
import { Link } from 'react-router-dom';

function PostDetail(props) {
  const { user } = props;
  const [comments, setComments] = useState([]);
  const [postDetail, setPostDetail] = useState(null);
  const [likes, setLikes] = useState([]);
  const [postLikesVisable, setPostLikesVisable] = useState(false);
  const [error, setError] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
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
        console.log('yeet');
        setError(res.data.error);
      }
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
        setError(res.data.error);
      }
      setComments(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setCommentsLoading(false);
    }
  };
  console.log(postDetail);

  if (error) {
    return <Error error={error} />;
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
          <div className='likers-container' id='likers-container'>
            <p
              onClick={() => {
                setPostLikesVisable(!postLikesVisable);
              }}
            >
              Likes [eye-icon]
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
          <h2>comments</h2>
          {comments.map((comment) => {
            return <Comment key={comment._id} comment={comment} />;
          })}
        </div>
      )}
    </div>
  );
}

export default PostDetail;

// useEffect(() => {
//   fetchPostDetail();
// }, []);

// const fetchPostDetail = async () => {
//   try {
//     const res = await axios(`http://localhost:4000/api/comments/${post._id}`, {
//       headers: { Authorization: user.token },
//     });
//     setPostDetail(res.data);
//   } catch (err) {
//     setError(err);
//   } finally {
//     setPostLoading(false);
//   }
// };
// //   console.log(props.post);

// if (loading) {
//   return <Loading />;
// }

// return (
//   <div className='post'>
//     {<h1>Owner: {post.owner.name.first}</h1>}
//     <p>{post.post}</p>
//   </div>
// );
