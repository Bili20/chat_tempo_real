import express from "express";
import { AuthController } from "../controllers/auth/authController";
import { GrupoController } from "../controllers/grupo/grupoController";
const grupoRoutes = express.Router();

grupoRoutes.get(
  "/grupo",
  //AuthController.verificaJWt,
  GrupoController.findAllGrupos
);

grupoRoutes.post(
  "/grupo",
  //AuthController.verificaJWt,
  GrupoController.createGrupo
);

export { grupoRoutes };
