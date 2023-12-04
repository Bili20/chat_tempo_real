import { Server } from "socket.io";
import { serverHttp } from "./server";

const io = new Server(serverHttp, {
  cors: {
    origin: "http://localhost:5173",
  },
});

export { io };
