import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Home from "./routes/home.tsx";
import Login from "./routes/login.tsx";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
//import AuthRouter from "./routes/_auth.tsx";

const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/*  <Router>
      <Routes>
        <Route element={<AuthRouter />}>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<p>oi</p>} />
        </Route>
      </Routes>
    </Router> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
