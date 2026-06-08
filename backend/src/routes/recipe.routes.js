import Router from "express";
import protect from "../middleware/auth.middleware.js"; // this is the auth middleware to protect routes (it checks for a valid JWT token  so user is authenticated or not)

import {
  createRecipe,
  deleteRecipe,
  generateRecipe,
  getRecipeById,
  getRecipes,
  suggestRecipes,
} from "../controllers/recipe.controller.js";

const router = Router();

router.use(protect); // this will protect all routes below it, so only authenticated users can access them

router.get("/", getRecipes);
router.post("/", createRecipe);
router.get("/:id", getRecipeById);
router.delete("/:id", deleteRecipe);

router.post("/generate", generateRecipe); // this route will generate a recipe using AI based on the recipe name provided in the request body

router.post("/suggest", suggestRecipes); // this route  will suggest recipes based on users pantry items

export default router;
