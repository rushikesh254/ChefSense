import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import recipeRoutes from "./routes/recipe.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import discoverRoutes from "./routes/discover.routes.js";
import healthCheckRoutes from "./routes/healthcheck.routes.js";
import pantryRoutes from "./routes/pantry.routes.js";
import savedRecipeRoutes from "./routes/savedRecipe.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

// middlewares
app.use(helmet()); // adds security headers to responses, helps protect against common web vulnerabilities.
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CROSS_ORIGIN?.split(",") || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// basic rate limit for all routes (max 200 requests per 15 minutes from same IP after that it will return 429 Too Many Requests)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: "too many requests, please try again later",
});
app.use(limiter);

// routes

app.get("/", (req, res) => {
  res.json({ message: "ChefSense API is running" });
});

//healthcheck route
app.use("/api/health", healthCheckRoutes);

//auth routes
app.use("/api/auth", authRoutes);

// recipe routes
app.use("/api/recipes", recipeRoutes);

// pantry routes
app.use("/api/pantry", pantryRoutes);

//saved recipes routes
app.use("/api/saved-recipes", savedRecipeRoutes);

// discover routes
app.use("/api/discover", discoverRoutes);

// user routes
app.use("/api/user", userRoutes);

// contact routes
app.use("/api/contact", contactRoutes);

// error handling middlewares (should be last)
app.use(notFound);
app.use(errorHandler);

export { app };
