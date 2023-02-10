import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiAccountCircle, mdiComment, mdiThumbUp } from '@mdi/js';
import '../style/post.css';

function Post(props) {
  const { post } = props;

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <div className='post-container'>
      <Link
        to={`/profile/${post.owner._id}`}
        style={{ textDecoration: 'none' }}
      >
        <div className='post-header-container'>
          <div className='post-header'>
            <Icon path={mdiAccountCircle} size={1.5} />
            <h1 className='post-header-text'>
              {post.owner.name.first} {post.owner.name.last}
            </h1>
          </div>
          <div className='timestamp-container'>
            <p className='timestamp-text'>
              {new Date(post.timestamp).toLocaleDateString('en-US', options)}
            </p>
          </div>
        </div>
      </Link>
      <Link
        to={`/profile/${post.owner._id}/posts/${post._id}`}
        style={{ textDecoration: 'none' }}
      >
        <p className='post-text'>{post.post}</p>
        <div className='comment-likes-container'>
          <div className='likes-container'>
            <Icon path={mdiThumbUp} size={1} color={'white'} />
            <p className='likes-count'>{post.likes.length}</p>
          </div>
          <div className='comments-container'>
            <Icon path={mdiComment} size={1} color={'white'} />
            <p className='comments-count'>{post.comments.length}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Post;
