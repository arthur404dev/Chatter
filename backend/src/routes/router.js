// Imports
import { Router } from "express";
import { index } from "./index.routes";
import { auth } from "./auth.routes";
import { chats } from "./chat.routes";
// Initializers
const routes = Router();
// Routing to Controllers
routes.use("/", index);
routes.use("/api/users", auth);
routes.use("/api/chat", chats);
// Exports
export const router = routes;
