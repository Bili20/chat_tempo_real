import "./style/loginTela.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth/authContext";

type payload = {
  email: string;
  senha: string;
};

const Login = () => {
  const auth = useContext(AuthContext);

  const [payload, setPayload] = useState<payload>({
    email: "",
    senha: "",
  });

  const logar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (payload.email && payload.senha) {
      const isLogged = await auth.signIn(payload.email, payload.senha);
      if (!isLogged) {
        alert("email ou senha incorreto");
      }
    }
  };

  return (
    <div>
      <form onSubmit={logar}>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="e-mail"
            id="email"
            value={payload.email}
            onChange={(e) =>
              setPayload((old) => ({ ...old, email: e.target.value }))
            }
            placeholder="Digite seu e-mail"
          />
        </div>
        <div className="form-control">
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            name="senha"
            id="senha"
            value={payload.senha}
            onChange={(e) =>
              setPayload((old) => ({ ...old, senha: e.target.value }))
            }
            placeholder="Digite sua senha"
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
