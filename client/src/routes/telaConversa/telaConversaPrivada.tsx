import NavBar from "../../components/navbarComponents/navBar";

const TelaConversaPrivada = () => {
  return (
    <>
      <NavBar />
      <div className="titulo">
        <h2>nome receptor</h2>
      </div>
      <div className="modal">
        <div className="texto">
          <ul>
            <p className="user">nome user</p>
            <li key="mensagem">oi tudo bem</li>
          </ul>
        </div>
      </div>
      <div>
        <input type="text" placeholder="Digite aqui" />
        <button className="envia-mensagem">enviar</button>
      </div>
    </>
  );
};

export default TelaConversaPrivada;
