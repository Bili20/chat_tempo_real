import NavBar from "../../components/navbarComponents/navBar";
import { useState, useEffect, useContext } from "react";
import "../../components/homeComponents/style/dropBox.css";
import DropDown from "../../components/homeComponents/dropBox";
import ModalMenssagem from "../../components/homeComponents/modalMenssagem";
import { webFetch } from "../../axios/axiosConfig";
import { User } from "../../contexts/auth/type/user";
import { AuthContext } from "../../contexts/auth/authContext";

export type pessoas = {
  email: string;
  grupos_pessoas: {
    id: number;
    grupo: {
      id: number;
      nome: string;
      descricao: string;
    };
  }[];
  id: number;
  nome: string;
};

type grupos = {
  id: number;
  nome: string;
  descricao: string;
};

const Home = () => {
  const auth = useContext(AuthContext);
  const [pessoas, setPessoa] = useState<pessoas[]>([]);
  const [grupos, setGrupo] = useState<grupos[]>([]);
  const [menssagemBox, setMenssagemBox] = useState({
    isOpen: false,
    infoUser: {
      nome: "",
    },
  });

  const getUsers = async () => {
    try {
      const response = await webFetch.get("/pessoa");

      const data = response.data;

      setPessoa(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getGrupos = async () => {
    try {
      const response = await webFetch.get("/grupo");

      const data = response.data;

      setGrupo(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
    getGrupos();
  }, []);

  return (
    <>
      <NavBar />
      {menssagemBox ? (
        <ModalMenssagem nome={menssagemBox.infoUser.nome} />
      ) : null}
      <div className="background-drop">
        <h1 className="nome-user">Olá {auth.user?.nome}</h1>
        {grupos.map((grupo) => (
          <div className="grupos" key={grupo.id}>
            <DropDown
              grupoNome={grupo.nome}
              users={pessoas}
              idGrupo={grupo.id}
              openModalGrupo={() =>
                setMenssagemBox((old) => ({
                  infoUser: grupo,
                  isOpen: !old.isOpen,
                }))
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
