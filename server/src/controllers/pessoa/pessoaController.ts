import { Request, Response } from "express";
import { prismaClient } from "../../config/prismaClient";
import bcrypt from "bcrypt";
import { IPessoa } from "./interfaces/interfacePessoa";
import validator from "email-validator";
export class PessoaController {
  static async createPessoa(req: Request, res: Response) {
    let { nome, email, senha, cpf } = req.body;
    try {
      const emailValido = validator.validate(email);
      if (!emailValido) {
        throw new Error("Email invalido");
      }
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
      res.status(400).json({ message: `${e} - falha ao cadastrar` });
    }
  }

  static async findAllPessoa(req: Request, res: Response) {
    try {
      const pessoas = await prismaClient.pessoa.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
          grupos_pessoas: {
            select: {
              id: true,
              grupo: true,
            },
          },
        },
      });

      res.status(200).json(pessoas);
    } catch (e) {
      res.status(400).json({ message: `${e} - falha na consulta` });
    }
  }

  static async findPessoaPorEmail(email: string): Promise<IPessoa | undefined> {
    const pessoa = await prismaClient.pessoa.findUnique({
      where: { email: email },
    });

    if (pessoa) {
      const newPessoa = {} as IPessoa;
      newPessoa.id = pessoa.id;
      newPessoa.email = pessoa.email;
      newPessoa.senha = pessoa.senha;
      newPessoa.nome = pessoa.nome;
      return newPessoa;
    } else {
      return;
    }
  }

  static async findOnePessoa(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const pessoa = await prismaClient.pessoa.findUniqueOrThrow({
        where: { id: Number(id) },
      });
      res.status(200).send({ id: pessoa.id, nome: pessoa.nome });
    } catch (e) {
      res.status(400).json({ message: "Erro, pessoa não encontrada" });
    }
  }
}
