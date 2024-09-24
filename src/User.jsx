// User.js
import React from "react";

const UserList = ({ onClick }) => {
  const users = FetchData({ endpoint: "users" }) || [];

  // Verifique se os dados foram carregados corretamente
  if (!users || users.length === 0) {
    return (
      <p>
        Não há usuários disponíveis ou os dados ainda estão sendo carregados.
      </p>
    );
  }

  return (
    <div className="grid-layout">
      {users.map((user) => (
        <User key={user.id} user={user} onClick={() => onClick(user)} />
      ))}
    </div>
  );
};

export default UserList;
