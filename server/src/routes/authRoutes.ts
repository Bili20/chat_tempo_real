import express from "express";
import { AuthController } from "../controllers/auth/authController";

const authRoutes = express.Router();

authRoutes.post("/login", AuthController.login);

export { authRoutes };
