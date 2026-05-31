import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controller.js";

// health check routes to check if the server is healthy or not
const healthCheckRoutes = Router();

healthCheckRoutes.get("/healthcheck", healthCheck);

export default healthCheckRoutes;
