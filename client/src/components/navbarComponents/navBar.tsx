import { Link, useNavigate } from "react-router-dom";
import "./style/navBar.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/authContext";
const NavBar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const deslogar = async () => {
    auth.signOut();
    localStorage.setItem("AuthAccess", "");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>
        <Link to={`/`}>Wave</Link>
      </h2>
      <ul>
        <li>
          <Link to={"/cadastro/grupo"} className="btn">
            Cadastro de Grupo
          </Link>
        </li>
        <li>
          <Link to={"/cadastro/user"} className="btn">
            Cadastro de Usuario
          </Link>
        </li>
        <li>
          <button onClick={deslogar} className="btn">
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
