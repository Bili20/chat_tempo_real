import { Request, Response } from "express";
import { prismaClient } from "../config/prismaClient";
import bcrypt from "bcrypt";
export class PessoaController {
  static async createPessoa(req: Request, res: Response) {
    let { nome, email, senha, cpf } = req.body;
    try {
      senha = await bcrypt.hash(senha, 10);
      const pessoa = await prismaClient.pessoa.create({
        data: {
          nome,
          email,
          senha,
          cpf,
        },
      });
      res.status(201).json({ id: pessoa.id, nome: pessoa.nome });
    } catch (e) {
      res.status(500).json({ message: `${e} - falha ao cadastrar` });
    }
  }

  static async findAllPessoa(req: Request, res: Response) {
    try {
      const pessoas = await prismaClient.pessoa.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
        },
      });

      res.status(200).json(pessoas);
    } catch (e) {
      res.status(500).json({ message: `${e} - falha na consulta` });
    }
  }
}
