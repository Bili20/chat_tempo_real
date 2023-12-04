import { Request, Response } from "express";
import { AuthController } from "../auth/authController";
import { prismaClient } from "../../config/prismaClient";
import { PessoaController } from "../pessoa/pessoaController";
import { IConversaGrupo } from "./interface/interfaceConversa";
import { MensagemGrupoController } from "../mensagemGrupo/mensagemGrupoController";

export class ConversaController {
  static async initConversaGrupo(
    idEmissor: number,
    idGrupo: number
  ): Promise<any> {
    try {
      const conversa = await prismaClient.conversa.create({
        data: { id_pessoa: idEmissor, id_grupo: idGrupo },
      });
      return conversa;
    } catch (e) {
      throw new Error(e);
    }
  }

  static async findConversaUserGrupo(req: Request, res: Response) {
    const IConversa: IConversaGrupo = req.body;
    try {
      const user = await AuthController.currentUser(IConversa.access);
      const pessoa = await PessoaController.findOnePessoa(user.id);

      const conversa = await prismaClient.conversa.findFirst({
        where: { id_pessoa: pessoa.id, id_grupo: IConversa.idGrupo },
      });

      if (conversa == null) {
        const conversa = await ConversaController.initConversaGrupo(
          pessoa.id,
          IConversa.idGrupo
        );
        const mensagens = await MensagemGrupoController.findMensagemUser(
          conversa.id
        );
        res.status(200).json({ mensagens });
      } else {
        const mensagens = await MensagemGrupoController.findMensagemUser(
          conversa.id
        );
        res.status(200).json({ mensagens });
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
