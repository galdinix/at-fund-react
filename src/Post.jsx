// Post.js
import React from "react";

const Post = ({ post, onClick }) => {
  return (
    <div className="post-card" onClick={onClick}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;
