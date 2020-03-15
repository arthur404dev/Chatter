import mongoose from "mongoose";
import { currDate } from "../helpers/index";

mongoose.Promise = global.Promise;
export const connect = async DBname => {
  // DB Certification
  const DB_user = process.env.DB_USER;
  const DB_pass = process.env.DB_PASS;
  const DB_name = DBname;
  // const DB_name = process.env.DB_NAME;
  const DB_url =
    "mongodb+srv://" +
    DB_user +
    ":" +
    DB_pass +
    "@chatter-main-rjrkt.mongodb.net/" +
    DB_name +
    "?retryWrites=true&w=majority";
  // Connect MongoDB Atlas.

  // @ts-ignore
  await mongoose.connect(
    DB_url,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    },
    err => {
      if (!err) {
        console.group();
        console.log(`MongoDB Atlas Connection to DB: ${DB_name} Succeeded.`);
        console.log(`_`.repeat(50));
        console.groupEnd();
      } else {
        console.log("Error in DB connection: " + err + " - " + currDate);
      }
    }
  );
};
