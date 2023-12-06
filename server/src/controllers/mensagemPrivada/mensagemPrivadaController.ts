import { Request, Response } from "express";
import { IMensagemPrivada } from "./interface/interfaceMensagemPrivada";
import { prismaClient } from "../../config/prismaClient";

export class MensagemPrivadaController {
  static async createMensagem(req: Request, res: Response) {
    const IMensagem: IMensagemPrivada = req.body;
    try {
      await prismaClient.mensagem_privada.create({
        data: {
          mensagem: IMensagem.mensagem,
          id_conversa: IMensagem.idConversa,
          id_pessoa: IMensagem.idPessoa,
        },
      });
      res.status(200).json();
    } catch (e) {
      throw new Error(e);
    }
  }
}
