import { serverHttp } from "./config/server";

serverHttp.listen(process.env.PORTA, () => {
  console.log(`Servidor rodadndo http://localhost:${process.env.PORTA}`);
});
