import { serverHttp } from "./config/server";
import { io } from "./config/webSocket";

io.on("connection", (socket) => {
  console.log("Usuario conectado:", socket.id);

  socket.on("disconnect", () => {
    console.log("Usuario desconectado", socket.id);
  });

  socket.on("user", (user) => {
    socket.data.username = user;
  });
});

serverHttp.listen(process.env.PORTA, () => {
  console.log(`Servidor rodadndo http://localhost:${process.env.PORTA}`);
});
