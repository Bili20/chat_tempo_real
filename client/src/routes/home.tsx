import NavBar from "../components/navbarComponents/navBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { URL } from "../constants/constants";
import "../components/homeComponents/style/dropBox.css";
import DropDown from "../components/homeComponents/dropBox";

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
  const [users, setUser] = useState<pessoas[]>([]);
  const [grupos, setGrupo] = useState<grupos[]>([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(`${URL}/pessoa`);

      const data = response.data;

      setUser(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getGrupos = async () => {
    try {
      const response = await axios.get(`${URL}/grupo`);

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
      <div className="background-drop">
        <h1 className="nome-user">Olá Usuario</h1>
        {grupos.map((grupo) => (
          <div className="grupos" key={grupo.id}>
            <DropDown grupoNome={grupo.nome} users={users} idGrupo={grupo.id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
