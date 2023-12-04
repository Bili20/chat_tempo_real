import { Request, Response } from "express";
import { IMensagemGrupo } from "./interface/interfaceMensagemGrupo";
import { prismaClient } from "../../config/prismaClient";

export class MensagemGrupoController {
  static async createMensagem(req: Request, res: Response) {
    const IMensagemGrupo: IMensagemGrupo = req.body;
    try {
      await prismaClient.mensagem_grupo.create({
        data: {
          id_pessoa: IMensagemGrupo.idPessoa,
          id_conversa: IMensagemGrupo.idConversa,
          mensagem: IMensagemGrupo.mensagem,
        },
      });
      res.status(200).json();
    } catch (e) {
      throw new Error(e);
    }
  }

  static async findMensagemUser(idGrupo: number) {
    const mensagens = await prismaClient.mensagem_grupo.findMany({
      where: { conversa: { id_grupo: idGrupo } },
    });
    return mensagens;
  }
}
