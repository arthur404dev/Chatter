// Build Router
import { Router } from "express";
const routes = Router();
// Routes
routes.get("/", (req, res, next) => {
  res.json("The Server is running!");
});
// Exports
export const index = routes;
