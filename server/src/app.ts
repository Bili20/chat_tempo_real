import { serverHttp } from "./config/server";

serverHttp.listen(3004, () => {
  console.log("Servidor rodadndo http://localhost:3004");
});
