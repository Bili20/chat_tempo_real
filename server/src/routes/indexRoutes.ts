import express, { Request, Response } from "express";
import { pessoaRoutes } from "./pessoaRoutes";
import { authRoutes } from "./authRoutes";

const routes = (app: any) => {
  app
    .route("/")
    .get((req: Request, res: Response) => res.status(200).send("Funcionando"));

  app.use(express.json(), pessoaRoutes, authRoutes);
};

export { routes };
