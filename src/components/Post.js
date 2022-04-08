import React from 'react';

const Post = (props) => {
  const {postTitle,pageNumber} = props;
  return (
    <div>{pageNumber}: {postTitle}</div>
  )
};

export default Post;
