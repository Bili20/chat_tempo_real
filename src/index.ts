import express from "express";
import http from "http";
import path from "path";

const app = express();
const serverHttp = http.createServer(app);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client/index.html"));
});

serverHttp.listen(3004, () => {
  console.log("Escutando na porta 3004");
});
