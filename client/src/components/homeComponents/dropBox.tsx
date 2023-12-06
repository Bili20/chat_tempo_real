import { useState } from "react";
import { pessoas } from "../../routes/home/home";
import { useNavigate } from "react-router-dom";

import { webFetch } from "../../axios/axiosConfig";

interface IProps {
  idGrupo: number;
  grupoNome: string;
  users: pessoas[];
}

const DropDown = (props: IProps) => {
  const [open, setOpen] = useState(false);
  const navegation = useNavigate();

  const postConversaGrupo = async () => {
    const storageData = localStorage.getItem("AuthAccess");
    try {
      const mensagens = await webFetch.post("/conversa/grupo", {
        access: storageData,
        idGrupo: Number(props.idGrupo),
      });
      const mensagemData = mensagens.data;
      navegation(`/conversa/${mensagemData.id}/grupo/${props.idGrupo}`);
    } catch (e) {
      console.log(e);
    }
  };

  const postConversaPrivada = async (idReceptor: number) => {
    const storageData = localStorage.getItem("AuthAccess");
    try {
      const mensagens = await webFetch.post("/conversa/privada", {
        access: storageData,
        idReceptor: idReceptor,
      });
      const mensagemData = mensagens.data;
      navegation(`/conversa/${mensagemData.id}/privada`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="btn-grupos">
        <button onClick={() => setOpen((old) => !old)}>
          {props.grupoNome}
        </button>
        <button className="conversa" onClick={postConversaGrupo}>
          <img className="icone" src="../../../img/comente.png" alt="logo" />
        </button>
      </div>
      {open
        ? props.users.map((user) => {
            const filtro = user.grupos_pessoas.filter(
              (item) => item.grupo.id === props.idGrupo
            );
            return (
              <ul className="menu">
                {filtro.length > 0 ? (
                  <li className="menu-item" key={user.id}>
                    <button onClick={() => postConversaPrivada(user.id)}>
                      {user.nome}
                    </button>
                  </li>
                ) : null}
              </ul>
            );
          })
        : null}
    </>
  );
};

export default DropDown;
