import { Request, Response } from "express";
import { AuthController } from "../auth/authController";
import { prismaClient } from "../../config/prismaClient";
import { PessoaController } from "../pessoa/pessoaController";
import { IConversaGrupo } from "./interface/interfaceConversa";

export class ConversaController {
  static async initConversaGrupo(idEmissor: number, idGrupo: number) {
    try {
      await prismaClient.conversa.create({
        data: { id_pessoa: idEmissor, id_grupo: idGrupo },
      });

      return;
    } catch (e) {
      console.log(e);
    }
  }

  static async findConversaUserGrupo(res: Response, req: Request) {
    const IConversa: IConversaGrupo = req.body;

    const user = await AuthController.currentUser(IConversa.access);
    const pessoa = await PessoaController.findOnePessoa(user.id);

    const conversa = await prismaClient.conversa.findMany({
      where: {
        id_grupo: IConversa.idGrupo,
        id_pessoa: pessoa.id,
      },
    });

    if (conversa.length <= 0) {
      await this.initConversaGrupo(pessoa.id, IConversa.idGrupo);
      //chama outra função para trazer as menssagens
    } else {
      //chama outra função para trazer as menssagens
    }
  }
}
