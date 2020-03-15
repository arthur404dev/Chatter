// Importing Dotenv to keep sensitive data secure
import dotenv from "dotenv";
import { currDate } from "./src/helpers";
dotenv.config({ path: __dirname + "/.env" });
// Log the success Status
console.group();
console.log(`─`.repeat(50));
console.log(
  `Environmental Variables status: ${process.env.ENV_STATUS} - ${currDate}`
);
console.groupEnd();
