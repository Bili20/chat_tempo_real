import { useContext, useEffect, useState } from "react";
import "./style/telaConversa.css";
import NavBar from "../../components/navbarComponents/navBar";
import { useParams } from "react-router-dom";
import { webFetch } from "../../axios/axiosConfig";
import { AuthContext } from "../../contexts/auth/authContext";

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
}[];

const TelaConversa = () => {
  const [mensagensBox, setMensagensBox] = useState<mensagens>([]);
  const [value, setGrupo] = useState<grupo>();
  const { idGrupo } = useParams();

  // preciso buscar as informaçoes do grupo, criar o type
  const getGrupo = async () => {
    try {
      const grupo = await webFetch.get(`/grupo/${idGrupo}`);

      setGrupo(grupo.data);
    } catch (e) {
      console.log(e);
    }
  };
  // preciso buscar as mensagens da conversa
  // preciso diferenciar oq é mensagem do usuario e oq não é
  const getMensagens = async () => {
    const storageData = localStorage.getItem("AuthAccess");
    try {
      const mensagens = await webFetch.post("/conversa", {
        access: storageData,
        idGrupo: Number(idGrupo),
      });
      console.log(mensagens);
      setMensagensBox(mensagens.data);
    } catch (e) {
      console.log(e);
    }
  };

  // preciso enviar mensagem

  useEffect(() => {
    getGrupo();
    getMensagens();
  }, []);

  return (
    <>
      <NavBar />
      <div className="titulo">
        <h2>{value?.nome}</h2>
      </div>
      <div className="modal">
        {mensagensBox.map((value) => {
          return (
            <div key="texto" className="texto">
              <ul key="mensagens">
                <p className="user">nome user</p>
                <li key="mensagem">{value.mensagem}</li>
              </ul>
            </div>
          );
        })}
      </div>
      <div>
        <input className="caixa-digito" type="text" placeholder="Digite aqui" />
        <button className="envia-mensagem">enviar</button>
      </div>
    </>
  );
};

export default TelaConversa;
