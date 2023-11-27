import { useState } from "react";
import { pessoas } from "../../routes/home";

interface IProps {
  idGrupo: number;
  grupoNome: string;
  users: pessoas[];
  openModalGrupo: () => void;
}

const DropDown = (props: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="btn-grupos">
        <button onClick={() => setOpen((old) => !old)}>
          {props.grupoNome}
        </button>
        <button className="conversa" onClick={() => props.openModalGrupo()}>
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
                    <h2>{user.nome}</h2>
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
