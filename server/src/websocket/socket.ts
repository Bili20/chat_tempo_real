import { io } from "../config/webSocket";
import { MensagemGrupoController } from "../controllers/mensagemGrupo/mensagemGrupoController";

interface IuserRoom {
  nome: string;
  grupo: number;
  socketId: string;
}

const users: IuserRoom[] = [];

io.on("connection", (socket) => {
  socket.on("room", (data) => {
    socket.join(data.grupo);

    const userInRoom = users.find(
      (user) => user.nome === data.nome && user.grupo === data.grupo
    );
    if (userInRoom) {
      userInRoom.socketId = socket.id;
    } else {
      users.push({
        nome: data.nome,
        grupo: data.grupo,
        socketId: socket.id,
      });
    }
  });

  socket.on("mensagem", async (data) => {
    const mensagem = await MensagemGrupoController.testecreateMensagem(data);

    io.to(data.idConversa).emit("mensagem", mensagem);
  });

  socket.on("disconnect", () => {
    console.log("Usuario desconectado", socket.id);
  });
});
