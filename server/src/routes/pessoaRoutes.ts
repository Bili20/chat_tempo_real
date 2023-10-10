import express from "express";
import { PessoaController } from "../controllers/pessoa/pessoaController";

const pessoaRoutes = express.Router();

pessoaRoutes.post("/pessoa", PessoaController.createPessoa);
pessoaRoutes.get("/pessoa", PessoaController.findAllPessoa);
//pessoaRoutes.get("/pessoa/email", PessoaController.findPessoaPorEmail);
pessoaRoutes.get("/pessoa/:id", PessoaController.findOnePessoa);

export { pessoaRoutes };
