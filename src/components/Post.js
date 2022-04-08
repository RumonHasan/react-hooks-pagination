import React from 'react';

const Post = (props) => {
  const {postTitle} = props;
  return (
    <div>{postTitle}</div>
  )
};

export default Post;
