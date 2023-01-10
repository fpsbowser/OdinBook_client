import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostDetail() {
  const [postDetail, setPostDetail] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetchPostDetail();
  // }, []);

  // const fetchPostDetail = async () => {
  //   try {
  //     const res = await axios(`http://localhost:4000/api/posts/${post._id}`, {
  //       headers: { Authorization: user.token },
  //     });
  //     setPostDetail(res.data);
  //   } catch (err) {
  //     setError(err);
  //   } finally {
  //     setLoading(false);
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
}

export default PostDetail;
