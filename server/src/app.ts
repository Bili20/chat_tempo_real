import { serverHttp } from "./config/server";

serverHttp.listen(3005, () => {
  console.log("Servidor rodadndo http://localhost:3005");
});
