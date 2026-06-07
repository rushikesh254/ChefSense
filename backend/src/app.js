import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import recipeRoutes from "../src/routes/recipe.routes.js";
import authRoutes from "./routes/auth.routes.js";
import healthCheckRoutes from "./routes/healthcheck.routes.js";
import pantryRoutes from "./routes/pantry.routes.js";

const app = express();

// middlewares
app.use(express.json({ limit: "10mb" })); // allow json data in the request body with a size limit of 10mb
app.use(express.urlencoded({ extended: true })); // allow urlencoded data in the request body
app.use(express.static("public")); // serve static files from the public directory
app.use(cookieParser()); // parse cookies in the request headers

app.use(
  cors({
    origin: process.env.CROSS_ORIGIN || "http://localhost:3000",
    credentials: true, // allow cookies and other credentials in the requests
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // allow these headers in the requests
  }),
);

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
import savedRecipeRoutes from "./routes/savedRecipe.routes.js";
app.use("/api/saved-recipes", savedRecipeRoutes);

export { app };
