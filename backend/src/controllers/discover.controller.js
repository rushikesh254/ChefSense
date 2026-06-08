import {
  CATEGORY_OPTIONS,
  CUISINE_OPTIONS,
  DIET_OPTIONS,
} from "../constants/discoverOptions.js";
import RecipeModel from "../models/recipe.model.js";

// Get recipe of the day  (from all the recipes select one skip random number of recipes and return the next one)
const getRecipeofTheDay = async (req, res) => {
  try {
    const count = await RecipeModel.countDocuments({ isPublic: true });
    if (count === 0) {
      return res.status(404).json({ message: "No recipes found" });
    }

    const skip = Math.floor(Math.random() * count);

    const recipe = await RecipeModel.findOne({ isPublic: true }).skip(skip);

    if (!recipe) {
      return res.status(404).json({ message: "No recipe found" });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    console.error("Recipe of the day err", error);
    res.status(500).json({ message: "Recipe of the day failed to get" });
  }
};

// Get trending recipes (from all the recipes sort by view count and rating and return the top 8)
const getTrendingRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find({ isPublic: true })
      .sort({ viewCount: -1, rating: -1 })
      .limit(8);
    res.status(200).json({ recipes });
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
      cookingTime: { $lt: 20 },
    })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ recipes, hasMore: recipes.length === limit });
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

    const recipes = await RecipeModel.find({
      isPublic: true,
      category: { $regex: new RegExp(category, "i") },
    })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ recipes, hasMore: recipes.length === limit });
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

    const recipes = await RecipeModel.find({
      isPublic: true,
      cuisine: { $regex: new RegExp(cuisine, "i") },
    })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ recipes, hasMore: recipes.length === limit });
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
    const recipes = await RecipeModel.find({
      isPublic: true,
      diet: { $regex: new RegExp(diet, "i") },
    })
      .skip(skip)
      .limit(limit);
    res.status(200).json({ recipes, hasMore: recipes.length === limit });
  } catch (error) {
    console.error("Get by diet err", error);
    res.status(500).json({ message: "Failed to get recipes by diet" });
  }
};

const searchRecipes = async (req, res) => {
  try {
    const query = String(req.query.q || "").trim();
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const recipes = await RecipeModel.find({
      isPublic: true,
      title: { $regex: query, $options: "i" },
    }).limit(20);

    res.status(200).json({ recipes, total: recipes.length });
  } catch (error) {
    console.error("Search recipes err", error);
    res.status(500).json({ message: "Failed to search recipes" });
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
  searchRecipes,
};
