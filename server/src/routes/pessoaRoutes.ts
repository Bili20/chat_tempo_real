import express from "express";
import { PessoaController } from "../controllers/pessoa/pessoaController";
import { AuthController } from "../controllers/auth/authController";

const pessoaRoutes = express.Router();

pessoaRoutes.post("/pessoa", PessoaController.createPessoa);
pessoaRoutes.get(
  "/pessoa",
  AuthController.verificaJWt,
  PessoaController.findAllPessoa
);
pessoaRoutes.get(
  "/pessoa/:id",
  AuthController.verificaJWt,
  PessoaController.findOnePessoa
);

export { pessoaRoutes };
