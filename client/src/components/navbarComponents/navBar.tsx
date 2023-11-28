import { Link } from "react-router-dom";
import "./style/navBar.css";
const NavBar = () => {
  return (
    <nav className="navbar">
      <h2>
        <Link to={`/home`}>Wave</Link>
      </h2>
      <ul>
        <li>
          <Link to={`/`} className="btn">
            Sair
          </Link>
        </li>
        <li>
          <Link to={"/cadastro/user"} className="btn">
            Cadastro de Usuario
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
