import { Router } from "express";
import protect from "../middleware/auth.middleware.js"; // this is the auth middleware to protect routes (it checks for a valid JWT token  so user is authenticated or not)

import {
  createRecipe,
  deleteRecipe,
  generateRecipe,
  getRecipeById,
  getRecipes,
  rateRecipe,
  suggestRecipes,
} from "../controllers/recipe.controller.js";

const router = Router();

router.use(protect); // this will protect all routes below it, so only authenticated users can access them

router.get("/", getRecipes);
router.post("/", createRecipe);
router.get("/:id", getRecipeById);
router.delete("/:id", deleteRecipe);
router.put("/:id/rate", rateRecipe);

router.post("/generate", generateRecipe);

router.post("/suggest", suggestRecipes);

export default router;
