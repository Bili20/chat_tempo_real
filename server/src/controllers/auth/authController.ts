import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { PessoaController } from "../pessoa/pessoaController";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ICustomRequest } from "./interfaces/interfacePayload";

dotenv.config();

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, senha } = req.body;
    try {
      const verificaEmail = await PessoaController.findPessoaPorEmail(email);

      if (verificaEmail) {
        const verificaSenha = bcrypt.compareSync(senha, verificaEmail.senha);
        if (verificaSenha) {
          const token = jwt.sign(
            { id: verificaEmail.id, nome: verificaEmail.nome },
            process.env.SECRET_JWT as string,
            {
              expiresIn: "7d",
            }
          );
          res.status(200).json({ acess: token });
        } else {
          res.status(401).json({ message: "Email ou senha incorreto" });
        }
      }
    } catch (e) {
      throw e;
    }
  }

  static async verificaJWt(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("authorization")?.replace("Bearer ", "");
      if (!token) {
        throw new Error();
      }

      const decoded = jwt.verify(token, process.env.SECRET_JWT as string);
      (req as ICustomRequest).token = decoded;

      next();
    } catch (e) {
      res.status(401).json();
    }
  }
}
