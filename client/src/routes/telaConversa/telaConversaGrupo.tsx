import { useContext, useEffect, useRef, useState } from "react";
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
  const refConversation = useRef(null);

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
      socket.emit("mensagemGrupo", {
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
    function onMsgEvent(data: any) {
      setMensagensBox((previous) => [...previous, data]);
      setTimeout(() => {
        if (refConversation.current) {
          const divScroll = refConversation.current as HTMLDivElement;

          divScroll.scrollTo({
            top: divScroll.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 50);
    }
    socket.connect();
    getGrupo();
    getMensagens();
    socket.emit("room", {
      idUser: auth.user?.id,
      grupo: Number(idConversa),
    });
    socket.on("mensagemGrupo", onMsgEvent);

    return () => {
      socket.off("mensagemGrupo", onMsgEvent);
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="container-conversa">
        <NavBar />
        <div className="titulo">
          <h2>{grupo?.nome}</h2>
        </div>
        <div className="container-conversa-modal">
          <div className="modal" ref={refConversation}>
            {mensagensBox.map((value, index) => {
              return (
                <div key={`${value.id} + ${index}`} className="texto">
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
        </div>
      </div>
    </>
  );
};

export default TelaConversaGrupo;
