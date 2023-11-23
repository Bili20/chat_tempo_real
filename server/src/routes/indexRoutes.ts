import express, { Request, Response } from "express";
import { pessoaRoutes } from "./pessoaRoutes";
import { authRoutes } from "./authRoutes";
import { grupoRoutes } from "./grupoRoutes";

const routes = (app: any) => {
  app
    .route("/")
    .get((req: Request, res: Response) => res.status(200).send("Funcionando"));

  app.use(express.json(), pessoaRoutes, authRoutes, grupoRoutes);
};

export { routes };
