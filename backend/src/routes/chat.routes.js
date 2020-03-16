// Build Router
import { Router } from "express";
const routes = Router();
// Import Model
import Chat from "../models/Chat";

// Routes
routes.get("/getChats", (req, res, next) => {
  Chat.find()
    .populate("sender")
    .exec((err, chats) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(chats);
    });
});
// Exports
export const chats = routes;
