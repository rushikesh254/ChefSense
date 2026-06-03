import Router from "express";
import authMiddleware from "../middleware/auth.middleware.js"; // this is the auth middleware to protect routes (it checks for a valid JWT token  so user is authenticated or not)

import {
  createRecipe,
  deleteRecipe,
  getRecipeById,
  getRecipes,
} from "../controllers/recipe.controller.js";

const router = Router();

router.use(authMiddleware); // this will protect all routes below it, so only authenticated users can access them

router.get("/", getRecipes);
router.post("/", createRecipe);
router.get("/:id", getRecipeById);
router.delete("/:id", deleteRecipe);

export default router;
