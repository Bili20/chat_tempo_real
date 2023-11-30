import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Home from "./routes/home/home.tsx";
import Login from "./routes/login/login.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CadastroPessoa from "./routes/cadastros/cadastroPessoa.tsx";
import CadastroGrupo from "./routes/cadastros/cadastroGrupo.tsx";
import { AuthProvider } from "./contexts/auth/authProvider.tsx";
import { RequireAuth } from "./contexts/auth/RequireAuth.tsx";

const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: "/cadastro/user",
        element: (
          <RequireAuth>
            <CadastroPessoa />
          </RequireAuth>
        ),
      },
      {
        path: "/cadastro/grupo",
        element: (
          <RequireAuth>
            <CadastroGrupo />
          </RequireAuth>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
