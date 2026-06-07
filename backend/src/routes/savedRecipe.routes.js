import Router from "express";

const router = Router();

import {
  getSavedRecipes,
  saveRecipe,
  unsaveRecipe,
} from "../controllers/savedRecipe.controller.js";
import protect from "../middleware/auth.middleware.js";

router.use(protect); // Apply authentication middleware to all routes

router.get("/", getSavedRecipes); // Route to get saved recipes for the authenticated user
router.post("/:recipeId", saveRecipe); // Route to save a recipe for the authenticated user
router.delete("/:recipeId", unsaveRecipe); // Route to unsave a recipe for the authenticated user

export default router; // Export the router to be used in the main application
