import React from "react";
import FetchData from "./FetchData"; // Certifique-se de ajustar o caminho para o arquivo correto
import "./App.css";

const App = () => {
  return (
    <div>
      <header>
        <h1>Minha Aplicação FetchData</h1>
      </header>
      <main>
        <FetchData /> {/* Exibir a lista de usuários */}
      </main>
      <footer>
        <p>© 2024 Minha Aplicação</p>
      </footer>
    </div>
  );
};

export default App;
