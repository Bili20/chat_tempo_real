import express from "express";
import { AuthController } from "../controllers/auth/authController";
import { GrupoController } from "../controllers/grupo/grupoController";
import { ConversaController } from "../controllers/conversa/conversaController";

const conversaRoutes = express.Router();

export { conversaRoutes };
