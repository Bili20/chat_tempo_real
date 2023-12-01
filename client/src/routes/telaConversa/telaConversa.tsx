import { useState } from "react";
import "./style/telaConversa.css";
import NavBar from "../../components/navbarComponents/navBar";

const TelaConversa = () => {
  const [menssagemBox, setMenssagemBox] = useState();

  return (
    <>
      <NavBar />
      <div className="titulo">
        <h2>Nome do grupo</h2>
      </div>
      <div className="modal">
        <input className="caixa-digito" type="text" placeholder="Digite aqui" />
        <div className="conteudo">
          <div className="texto">
            <p className="nome-user">nome user</p>
            <p>oi estou no conteudo</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TelaConversa;
