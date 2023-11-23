import { Request, Response } from "express";
import { prismaClient } from "../../config/prismaClient";

export class GrupoController {
  static async findOneGrupo(id: number) {
    const grupo = await prismaClient.grupo.findUnique({
      where: {
        id: id,
      },
    });
    if (!grupo) {
      throw new Error("Grupo não encontrado");
    }
    return grupo;
  }

  static async findAllGrupos(req: Request, res: Response) {
    try {
      const grupo = await prismaClient.grupo.findMany();
      res.status(200).json(grupo);
    } catch (e) {
      res.status(400).json({ messgae: `Erro ao buscar grupos` });
    }
  }
}
