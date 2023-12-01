import { Request, Response } from "express";
import { IMensagemGrupo } from "./interface/interfaceMensagemGrupo";
import { prismaClient } from "../../config/prismaClient";

export class MensagemGrupoController {
  static async createMensagem(res: Response, req: Request) {
    const IMensagemGrupo: IMensagemGrupo = req.body;
    console.log(IMensagemGrupo);
    // verificar se ele pode mandar mensagem no grupo
    try {
      /* const mensagem = await prismaClient.mensagem_grupo.create({
        data: {
          id_pessoa: IMensagemGrupo.idPessoa,
          id_conversa: IMensagemGrupo.idConversa,
          mensagem: IMensagemGrupo.mensagem,
        },
      }); */
    } catch (e) {
      throw new Error(e);
    }
  }

  static async findMensagemUser() {}
}
