import { useParams } from "react-router-dom";
import NavBar from "../../components/navbarComponents/navBar";
import { webFetch } from "../../config/axiosConfig";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
import { socket } from "../../config/socket";
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

type pessoa = {
  id: number;
  nome: string;
  email: string;
};

const TelaConversaPrivada = () => {
  const { idConversa, idReceptor } = useParams();
  const [mensagensBox, setMensagensBox] = useState<mensagens>([]);
  const [pessoa, setPessoa] = useState<pessoa>();
  const [mensagem, setMensagem] = useState<string>("");
  const auth = useContext(AuthContext);

  const getUser = async () => {
    const pessoa = await webFetch.get(`/pessoa/${idReceptor}`);
    setPessoa(pessoa.data);
  };

  const getMensagens = async () => {
    try {
      const mensagem = await webFetch.get(
        `mensagens/privada/emissor/${auth.user?.id}/receptor/${idReceptor}`
      );
      setMensagensBox(mensagem.data);
    } catch (e) {
      console.log(e);
    }
  };

  const enviaMensagem = async () => {
    try {
      socket.emit("mensagemPrivada", {
        mensagem: mensagem,
        idConversa: Number(idConversa),
        idPessoa: auth.user?.id,
        idReceptor: Number(idReceptor),
      });
      setMensagem("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    function onMsgEvent(data: any) {
      setMensagensBox((previous) => [...previous, data]);
    }
    socket.connect();
    getMensagens();
    getUser();
    socket.emit("userReceptor", {
      idUser: auth.user?.id,
      idReceptor: Number(idReceptor),
      idConversa: Number(idConversa),
    });

    socket.on("mensagemPrivada", onMsgEvent);

    return () => {
      socket.off("mensagemPrivada", onMsgEvent);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="titulo">
        <h2>{pessoa?.nome}</h2>
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

export default TelaConversaPrivada;
