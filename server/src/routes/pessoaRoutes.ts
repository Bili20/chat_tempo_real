import express from "express";
import { PessoaController } from "../controllers/pessoaController";

const pessoaRoutes = express.Router();

pessoaRoutes.post("/pessoa", PessoaController.createPessoa);
pessoaRoutes.get("/pessoas", PessoaController.findAllPessoa);

export { pessoaRoutes };
