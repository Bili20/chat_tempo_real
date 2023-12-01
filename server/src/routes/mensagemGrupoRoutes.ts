import express from "express";
import { AuthController } from "../controllers/auth/authController";
import { MensagemGrupoController } from "../controllers/mensagemGrupo/mensagemGrupoController";

const mensagemGrupoRoutes = express.Router();

mensagemGrupoRoutes.post(
  "/mensagem/grupo",
  AuthController.verificaJWt,
  MensagemGrupoController.createMensagem
);
export { mensagemGrupoRoutes };
