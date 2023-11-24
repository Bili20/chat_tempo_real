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
          <Link to={`/`} className="bnt-sair">
            Sair
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
