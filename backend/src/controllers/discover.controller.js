import {
  CATEGORY_OPTIONS,
  CUISINE_OPTIONS,
  DIET_OPTIONS,
} from "../constants/discoverOptions.js";
import RecipeModel from "../models/recipe.model.js";

const featuredCache = { recipe: null, timestamp: null };
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

const getRecipeofTheDay = async (req, res) => {
  try {
    const now = Date.now();
    if (featuredCache.recipe && featuredCache.timestamp && (now - featuredCache.timestamp < TWENTY_FOUR_HOURS)) {
      return res.status(200).json({ recipe: featuredCache.recipe });
    }

    const queryFilter = { isPublic: true };
    const count = await RecipeModel.countDocuments(queryFilter);

    if (count === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }

    const skip = Math.floor(Math.random() * count);

    const recipe = await RecipeModel.findOne(queryFilter).skip(skip);

    if (!recipe) {
      return res.status(404).json({ message: "No recipe found" });
    }

    featuredCache.recipe = recipe;
    featuredCache.timestamp = now;

    res.status(200).json({ recipe });
  } catch (error) {
    console.error("Recipe of the day err", error);
    res.status(500).json({ message: "Recipe of the day failed to get" });
  }
};

// Get trending recipes (from all the recipes sort by view count and rating, paginated like quick meals)
const getTrendingRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12;

    const skip = (page - 1) * limit;

    const recipes = await RecipeModel.find({ isPublic: true })
      .sort({ viewCount: -1, averageRating: -1 })
      .skip(skip)
      .limit(limit);
    const total = await RecipeModel.countDocuments({ isPublic: true });
    res.status(200).json({ recipes, hasMore: skip + recipes.length < total });
  } catch (error) {
    console.error("Trending err", error);
    res.status(500).json({ message: "Trending recipes failed to get" });
  }
};

//  quick meals (used pagination at each response send 12 recipes with cooking time less than 20 minutes)
const getQuickRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12;

    const skip = (page - 1) * limit;

    const recipes = await RecipeModel.find({
      isPublic: true,
      cookTime: { $lt: 20 },
    })
      .skip(skip)
      .limit(limit);
    const total = await RecipeModel.countDocuments({
      isPublic: true,
      cookTime: { $lt: 20 },
    });
    res.status(200).json({ recipes, hasMore: skip + recipes.length < total });
  } catch (error) {
    console.error("Quick recipes err", error);
    res.status(500).json({ message: "Quick recipes failed to get" });
  }
};

const getCategories = async (req, res) => {
  res.status(200).json({ categories: CATEGORY_OPTIONS });
};

const getCuisines = async (req, res) => {
  res.status(200).json({ cuisines: CUISINE_OPTIONS });
};

const getDiets = async (req, res) => {
  res.status(200).json({ diets: DIET_OPTIONS });
};
const getByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const safeCategory = category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const recipes = await RecipeModel.find({
      isPublic: true,
      category: { $regex: safeCategory, $options: "i" },
    })
      .skip(skip)
      .limit(limit);
    const total = await RecipeModel.countDocuments({
      isPublic: true,
      category: { $regex: safeCategory, $options: "i" },
    });
    res.status(200).json({ recipes, hasMore: skip + recipes.length < total });
  } catch (error) {
    console.error("Get by category err", error);
    res.status(500).json({ message: "Failed to get recipes by category" });
  }
};

const getByCuisine = async (req, res) => {
  try {
    const cuisine = req.params.cuisine;

    const page = parseInt(req.query.page) || 1;

    const limit = 12;
    const skip = (page - 1) * limit;

    const safeCuisine = cuisine.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const recipes = await RecipeModel.find({
      isPublic: true,
      cuisine: { $regex: safeCuisine, $options: "i" },
    })
      .skip(skip)
      .limit(limit);
    const total = await RecipeModel.countDocuments({
      isPublic: true,
      cuisine: { $regex: safeCuisine, $options: "i" },
    });
    res.status(200).json({ recipes, hasMore: skip + recipes.length < total });
  } catch (error) {
    console.error("Get by cuisine err", error);
    res.status(500).json({ message: "Failed to get recipes by cuisine" });
  }
};

const getByDiet = async (req, res) => {
  try {
    const diet = req.params.diet;

    const page = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const safeDiet = diet.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const recipes = await RecipeModel.find({
      isPublic: true,
      diet: { $regex: safeDiet, $options: "i" },
    })
      .skip(skip)
      .limit(limit);
    const total = await RecipeModel.countDocuments({
      isPublic: true,
      diet: { $regex: safeDiet, $options: "i" },
    });
    res.status(200).json({ recipes, hasMore: skip + recipes.length < total });
  } catch (error) {
    console.error("Get by diet err", error);
    res.status(500).json({ message: "Failed to get recipes by diet" });
  }
};
export {
  getByCategory,
  getByCuisine,
  getByDiet,
  getCategories,
  getCuisines,
  getDiets,
  getQuickRecipes,
  getRecipeofTheDay,
  getTrendingRecipes,
};
