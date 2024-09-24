// Comment.js
import React, { useState } from "react";

const Comment = ({ comment }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = () => {
    if (window.confirm("Tem certeza que deseja excluir este comentário?")) {
      setIsDeleted(true);
    }
  };

  if (isDeleted) return null;

  const email = `@${comment.email.split("@")[0]}`;
  const name =
    comment.name.split(" ").slice(0, 1).join(" ") +
    " " +
    comment.name.split(" ").slice(-1).join(" ");

  return (
    <div className="comment-card">
      <h4>{name}</h4>
      <p>{email}</p>
      <p>{comment.body.slice(0, 140)}</p>
      <button onClick={handleDelete}>Excluir</button>
    </div>
  );
};

export default Comment;
