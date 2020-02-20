import Db from "./Db";
import App from "./App";

const MONGO_URI= process.env.MONGO_URI;
const PORT = process.env.PORT;

async function main(): Promise<void> {
  try {
    await new Db().connect(MONGO_URI);
    console.log(`db connected to ${MONGO_URI}`);
    await new App().listen(PORT);
    console.log(`listening on port ${PORT}`);
  } catch (e) {
    console.log("main error: ");
    console.log(e);
  }
}

main();
