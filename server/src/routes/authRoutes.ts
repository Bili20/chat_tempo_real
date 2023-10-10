import express from "express";
import { AuthController } from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.post("/login", AuthController.login);

export { authRoutes };
