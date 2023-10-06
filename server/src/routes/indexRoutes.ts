import express, { Request, Response } from "express";
import { pessoaRoutes } from "./pessoaRoutes";

const routes = (app: any) => {
  app
    .route("/")
    .get((req: Request, res: Response) => res.status(200).send("Funcionando"));

  app.use(express.json(), pessoaRoutes);
};

export { routes };
