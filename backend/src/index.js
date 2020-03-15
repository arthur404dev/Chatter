// Config and Helper
import "../config";
import { currDate } from "./helpers/index";
// Imports
import express from "express";
import cors from "cors";
import socketio from "socket.io";
import passport from "passport";
import bodyParser, { urlencoded } from "body-parser";
import { router } from "./routes/router";
// Instance Creators
import http from "http";
import { connect } from "./config/db.config";
import { handler } from "./chat";
// Initialize App
const app = express();
// Initialize Server
const server = http.createServer(app);
// Connect to DB
connect(process.env.DB_NAME);
// Setup Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Setup Passport
app.use(passport.initialize());
require("./config/passport.config")(passport);
// Initialize Routes
app.use(router);
// Initialize Socket.io
export const io = socketio(server);
io.on("connection", handler);
// Define the server PORT
const PORT = process.env.PORT || 5555;
// Start the server
server.listen(PORT, () => {
  console.group();
  console.log(`_`.repeat(50));
  console.log(`Server Online Listening to port ${PORT} - ${currDate}`);
  console.log(`_`.repeat(50));
  console.groupEnd();
});
