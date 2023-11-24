import { Outlet } from "react-router-dom";
import Login from "./login";

export default function AuthRouter() {
  const isConnect = true;
  return isConnect ? <Outlet /> : <Login />;
}
