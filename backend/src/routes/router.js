// Imports
import { Router } from "express";
import { index } from "./index.routes";
import { auth } from "./auth.routes";
// Initializers
const routes = Router();
// Routing to Controllers
routes.use("/", index);
routes.use("/api/users", auth);
// Exports
export const router = routes;
