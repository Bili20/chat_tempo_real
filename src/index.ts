import express from "express";
import http from "http";
const app = express();
const serverHttp = http.createServer(app);

app.get("/", (req, res) => {
  console.log("teste de teste topo do mal");
});

serverHttp.listen(3004, () => {
  console.log("Escutando na porta 3004");
});
