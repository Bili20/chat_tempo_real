import express from "express";
import { AuthController } from "../controllers/auth/authController";
import { ConversaController } from "../controllers/conversa/conversaController";

const conversaRoutes = express.Router();

conversaRoutes.post(
  "/conversa",
  AuthController.verificaJWt,
  ConversaController.findConversaUserGrupo
);

export { conversaRoutes };
