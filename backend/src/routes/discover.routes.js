import Router from "express";
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
router.get("/category/:name", getByCategory);
router.get("/cuisine/:name", getByCuisine);
router.get("/diet/:name", getByDiet);
router.get("/search", searchRecipes);

export default router;
