import React, { useState, useEffect } from "react";

const FetchData = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsers();
  }, []);

  const fetchPostsByUserId = async (userId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  const fetchCommentsByPostId = async (postId) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchPostsByUserId(user.id);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    fetchCommentsByPostId(post.id);
  };

  const formatEmail = (email) => {
    const username = email.split("@")[0];
    return `@${username}`;
  };

  const truncateBody = (body) => {
    return body.length > 140 ? body.substring(0, 140) + "..." : body;
  };

  const handleDeleteComment = (commentId) => {
    if (
      window.confirm("Você tem certeza que deseja excluir este comentário?")
    ) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const goBack = () => {
    if (selectedPost) {
      setSelectedPost(null); // Se estiver nos comentários, volta para os posts
    } else if (selectedUser) {
      setSelectedUser(null); // Se estiver nos posts, volta para os usuários
    }
  };

  return (
    <div>
      {/* Barra de navegação */}
      <nav className="navbar">
        <button onClick={goBack} disabled={!selectedUser && !selectedPost}>
          Voltar
        </button>
        <button onClick={toggleView}>
          Alternar para {isGridView ? "Lista" : "Grade"}
        </button>
      </nav>

      {!selectedUser && (
        <div className={isGridView ? "users-grid" : "users-list"}>
          {users.map((user) => (
            <div
              key={user.id}
              className="user-card"
              onClick={() => handleUserClick(user)}
            >
              <h2>{user.name}</h2>
              <p>{user.company.catchPhrase}</p>
            </div>
          ))}
        </div>
      )}

      {selectedUser && !selectedPost && (
        <div>
          <h2>Posts de {selectedUser.name}</h2>
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                className="post-card"
                onClick={() => handlePostClick(post)}
              >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedPost && (
        <div>
          <h2>Comentários do post: {selectedPost.title}</h2>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="comment-card">
                <div className="comment-header">
                  <strong>
                    {comment.name.split(" ").slice(0, 1).join(" ")}{" "}
                    {comment.name.split(" ").slice(-1).join(" ")}
                  </strong>
                  <span>{formatEmail(comment.email)}</span>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="delete-button"
                  >
                    Excluir
                  </button>
                </div>
                <p>{truncateBody(comment.body)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FetchData;
