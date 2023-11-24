import { Link } from "react-router-dom";
import "./style/loginTela.css";
const LoginTela = () => {
  return (
    <div className="bnt">
      <Link to={`/home`} className="bnt-entra">
        Entrar
      </Link>
    </div>
  );
};

export default LoginTela;
