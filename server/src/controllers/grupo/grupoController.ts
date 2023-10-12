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
}
