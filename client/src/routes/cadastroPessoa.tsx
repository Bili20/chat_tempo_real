import "../components/cadastroPessoa/style/cadastroPessoa.css";
import NavBar from "../components/navbarComponents/navBar";
import { webFetch } from "../axios/axiosConfig";
import { useState } from "react";

export type pessoa = {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
};

const INIT_ALL_USER = {
  cpf: "",
  email: "",
  nome: "",
  senha: "",
};

const CadastroPessoa = () => {
  const [user, setUser] = useState<pessoa>(INIT_ALL_USER);

  const criarUser = async (e: React.FormEvent) => {
    e.preventDefault();

    await webFetch
      .post("/pessoa", {
        ...user,
      })
      .then(() => {
        setUser(INIT_ALL_USER);
      })
      .catch((e) => {
        setUser(e);
      });
  };
  return (
    <>
      <NavBar />
      <div className="cadastro-user">
        <h2>Cadastro de Usuario:</h2>
        <form onSubmit={criarUser}>
          <div className="form-control">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Digite aqui"
              value={user.nome}
              onChange={(e) =>
                setUser((old) => ({ ...old, nome: e.target.value }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite aqui"
              value={user.email}
              onChange={(e) =>
                setUser((old) => ({ ...old, email: e.target.value }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Digite aqui"
              value={user.senha}
              onChange={(e) =>
                setUser((old) => ({ ...old, senha: e.target.value }))
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="cpf">Cpf:</label>
            <input
              type="number"
              name="cpf"
              id="cpf"
              placeholder="Digite aqui"
              value={user.cpf}
              onChange={(e) =>
                setUser((old) => ({ ...old, cpf: e.target.value }))
              }
            />
          </div>
          <input type="submit" value="Criar" className="btn" />
        </form>
      </div>
    </>
  );
};

export default CadastroPessoa;
