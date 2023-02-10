import React from 'react';
import { Link } from 'react-router-dom';
import { mdiThumbUp, mdiComment } from '@mdi/js';
import Icon from '@mdi/react';
import '../style/profileposts.css';

function ProfilePosts(props) {
  const { posts, currentUser } = props;
  let name = '';

  if (posts.length === 0) {
    return <h1>No posts!</h1>;
  } else {
    posts[0].owner._id === currentUser.id
      ? (name = 'Your')
      : (name = `${posts[0].owner.name.first}'s`);
    return (
      <div className='profile-posts-container'>
        <h2 className='posts-header'>{name} posts:</h2>
        {posts.map((post) => {
          return (
            <Link
              to={`/profile/${post.owner._id}/posts/${post._id}`}
              key={post._id}
            >
              <div className='profile-post'>
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
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default ProfilePosts;
