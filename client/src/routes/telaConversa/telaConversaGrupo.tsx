import { useContext, useEffect, useState } from "react";
import "./style/telaConversaGrupo.css";
import NavBar from "../../components/navbarComponents/navBar";
import { useParams } from "react-router-dom";
import { webFetch } from "../../config/axiosConfig";
import { AuthContext } from "../../contexts/auth/authContext";
import { socket } from "../../config/socket";

type grupo = {
  id: number;
  nome: string;
  descricao: string;
};

type mensagens = {
  id: number;
  mensagem: string;
  dataCadastro: Date;
  idConversa: number;
  idPessoa: number;
  pessoa: {
    nome: string;
  };
}[];

const TelaConversaGrupo = () => {
  const [mensagensBox, setMensagensBox] = useState<mensagens>([]);
  const [grupo, setGrupo] = useState<grupo>();
  const { idGrupo, idConversa } = useParams();
  const [mensagem, setMensagem] = useState<string>("");
  const auth = useContext(AuthContext);

  const getGrupo = async () => {
    try {
      const grupo = await webFetch.get(`/grupo/${idGrupo}`);

      setGrupo(grupo.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getMensagens = async () => {
    try {
      const mensagem = await webFetch.get(`/mensagens/grupo/${idGrupo}`);
      setMensagensBox(mensagem.data);
    } catch (e) {
      console.log(e);
    }
  };

  const enviaMensagem = async () => {
    try {
      socket.emit("mensagem", {
        mensagem: mensagem,
        idConversa: Number(idConversa),
        idPessoa: auth.user?.id,
      });
      setMensagem("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    socket.connect();
    getGrupo();
    getMensagens();
    socket.emit("room", {
      nome: auth.user?.nome,
      grupo: Number(idConversa),
    });
    socket.on("mensagem", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <>
      <NavBar />
      <div className="titulo">
        <h2>{grupo?.nome}</h2>
      </div>
      <div className="modal">
        {mensagensBox.map((value, index) => {
          return (
            <div key={value.id + index} className="texto">
              <ul key="mensagens">
                <p className="user">{value.pessoa.nome}:</p>
                <li key="mensagem">{value.mensagem}</li>
              </ul>
            </div>
          );
        })}
      </div>
      <div>
        <input
          onChange={(e) => setMensagem(e.target.value)}
          value={mensagem}
          className="caixa-digito"
          type="text"
          placeholder="Digite aqui"
        />
        <button onClick={enviaMensagem} className="envia-mensagem">
          enviar
        </button>
      </div>
    </>
  );
};

export default TelaConversaGrupo;
