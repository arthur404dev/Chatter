// Imports
import { Router } from "express";
import { index } from "./index.routes";
// Initializers
const routes = Router();
// Routing to Controllers
routes.use("/", index);
// Exports
export const router = routes;
