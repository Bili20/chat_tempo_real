import { Request, Response } from "express";
import { prismaClient } from "../config/prismaClient";
import bcrypt from "bcrypt";
import { PessoaController } from "./pessoa/pessoaController";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    try {
      const verificaEmail = await PessoaController.findPessoaPorEmail(email);
      console.log(verificaEmail);
      return;
      const verificaSenha = bcrypt.compareSync(
        senha,
        verificaEmail?.senha ?? ""
      );

      if (verificaSenha) {
        return true;
      } else {
        res.status(401).json({ message: "Email ou senha incorreto" });
      }
    } catch (e) {
      throw e;
    }
  }
}
