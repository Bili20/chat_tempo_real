import express from "express";
import { PessoaController } from "../controllers/pessoaController";

const pessoaRoutes = express.Router();

pessoaRoutes.post("/pessoa", PessoaController.createPessoa);

export { pessoaRoutes };
