// Build Router
import { Router } from "express";
const routes = Router();
// Import Model
import Chat from "../models/Chat";

// Routes
routes.get("/getChats", (req, res, next) => {
  Chat.find()
    // Return only newest
    .sort({ createdAt: -1 })
    // Limit records to 50
    .limit(50)
    .populate("sender")
    .exec((err, chats) => {
      // Uncomment the following line to check the amount of messages returned =>
      // console.log(chats.length);
      if (err) return res.status(400).send(err);
      res.status(200).send(chats.reverse());
    });
});
// Exports
export const chats = routes;
