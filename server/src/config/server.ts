import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const serverHttp = http.createServer(app);

app.use(cors());

export { serverHttp };
