import { Router } from "express";
import {
  getByCategory,
  getByCuisine,
  getByDiet,
  getCategories,
  getCuisines,
  getDiets,
  getQuickRecipes,
  getRecipeofTheDay,
  getTrendingRecipes,
  searchRecipes,
} from "../controllers/discover.controller.js";
import protect from "../middleware/auth.middleware.js";
const router = Router();

router.use(protect);

router.get("/featured", getRecipeofTheDay);
router.get("/trending", getTrendingRecipes);
router.get("/quick-meals", getQuickRecipes);
router.get("/categories", getCategories);
router.get("/cuisines", getCuisines);
router.get("/diets", getDiets);
router.get("/category/:category", getByCategory);
router.get("/cuisine/:cuisine", getByCuisine);
router.get("/diet/:diet", getByDiet);
router.get("/search", searchRecipes);

export default router;
