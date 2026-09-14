import PantryItemModel from "../models/pantryItem.model.js";
import RecipeModel from "../models/recipe.model.js";
import {
  generateRecipe as aiGenerate,
  generateSuggestions,
} from "../services/ai.service.js";
import { fetchRecipeImage } from "../services/image.service.js";
import calculateExpiryStatus from "../utils/expiry.js";

import {
  createRecipeSchema,
  generateRecipeSchema,
  rateRecipeSchema,
} from "../validation/recipe.js";

const GENERATION_LIMIT = 100; // number of recipes can generate
const SUGGESTION_LIMIT = 100; // number of times suggestion from pantry itmes

//  get all recipes from the database and return them in the response (send all recipes which is public or created by the authenticated user and also support search by title using query parameter q this is also done in generate recipe endpoint to check if recipe with the same title already exist or not)

//GET /api/recipes
const getRecipes = async (req, res) => {
  try {
    const q = String(req.query.q || "").trim(); // search query for recipe
    const filter = { $or: [{ isPublic: true }, { author: req.userId }] }; // filter to get public recipes or recipes created by the authenticated user

    if (q) {
      const safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.title = { $regex: safeQ, $options: "i" };
    }

    const recipes = await RecipeModel.find(filter).sort({ createdAt: -1 }); // get recipes from the database based on the filter and sort them by creation date (newest first)
    res.status(200).json({ recipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
};

// create a new recipe and save it to the database
//POST /api/recipes
const createRecipe = async (req, res) => {
  try {
    const data = req.body?.data || req.body;

    const result = createRecipeSchema.safeParse(data);

    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }

    const {
      title,
      description,
      ingredients,
      instructions,
      cuisine,
      category,
      diet,
      difficulty,
      tags,
      prepTime,
      cookTime,
      servings,
      imageUrl,
      isVeg,
      isPublic,
    } = result.data;

    const recipe = await RecipeModel.create({
      title,
      description,
      ingredients,
      instructions,
      cuisine,
      category,
      diet,
      difficulty,
      tags,
      prepTime,
      cookTime,
      servings,
      imageUrl,
      isVeg,
      isPublic,
      author: req.userId,
    });

    res.status(201).json({ recipe });
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Failed to create recipe" });
  }
};

// get a single recipe by its ID from the database and return it in the response
//GET /api/recipes/:id
const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await RecipeModel.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    // check if the recipe is public or if the authenticated user is the author of the recipe
    const canView =
      recipe.isPublic || recipe.author.toString() === req.userId.toString();

    if (!canView) {
      return res
        .status(403)
        .json({ message: "Not allowed to access this recipe" });
    }

    if (recipe.contentStatus === "partial") {
      const aiData = await aiGenerate(recipe.title);
      const imageUrl = await fetchRecipeImage(aiData.title);
      recipe.ingredients = aiData.ingredients;
      recipe.instructions = aiData.instructions;
      recipe.imageUrl = imageUrl;
      recipe.contentStatus = "complete";
      recipe.source = "ai";
      recipe.nutrition = aiData.nutrition;
      recipe.substitutions = aiData.substitutions;
    }

    recipe.viewCount += 1;
    await recipe.save();

    res.status(200).json({ recipe });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Failed to fetch recipe" });
  }
};

// delete a recipe by its ID from the database and return a success message in the response
//DELETE /api/recipes/:id
const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await RecipeModel.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    // Check if the authenticated user is the author of the recipe
    if (recipe.author.toString() !== req.userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this recipe" });
    }

    await RecipeModel.findByIdAndDelete(recipeId); // delete the recipe from the database

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Failed to delete recipe" });
  }
};

const suggestRecipes = async (req, res) => {
  try {
    if (req.user.usage.suggestionCount >= SUGGESTION_LIMIT) {
      return res.status(429).json({
        message: "Suggestion limit reached.",
      });
    }

    const items = await PantryItemModel.find({ owner: req.userId }); // get pantry items for the authenticated user

    if (items.length === 0) {
      return res
        .status(400)
        .json({ message: "No pantry items found. add  Items ." });
    }

    // refresh expiry status
    for (const item of items) {
      const current = calculateExpiryStatus(item.expiryDate);
      if (current !== item.expiryStatus) {
        item.expiryStatus = current;
        await item.save();
      }
    }

    // build summary of pantry items to send to AI for recipe suggestion

    const eachItem = items.map((item) => {
      let status = "fresh";
      if (item.expiryStatus === "expired") {
        status = "expired";
      } else if (item.expiryStatus === "expiring soon") {
        status = "expiring soon";
      }
      return `- ${item.name} (${status})`;
    });

    const summary = eachItem.join("\n");

    // call ai get recipes suggestions

    const suggestions = await generateSuggestions(summary);

    // fetch images for each suggestion

    const recipes = [];
    for (const s of suggestions) {
      const img = await fetchRecipeImage(s.title);
      recipes.push({ ...s, imageUrl: img });
    }

    req.user.usage.suggestionCount += 1;

    await req.user.save();

    res.status(200).json({ recipes });
  } catch (error) {
    console.error("Error suggesting recipes:", error);
    res.status(500).json({ message: "Failed to suggest recipes , Try Again" });
  }
};

const generateRecipe = async (req, res) => {
  try {
    const { recipeName } = req.body;

    // validate the recipe name using zod schema and return error if validation fails

    // here we are using safeParse method of zod which will return an object with success property and if success is false then it will return error property with the validation errors

    const result = generateRecipeSchema.safeParse({ recipeName });

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    // check generation limit

    if (req.user.usage.recipeGenerationCount >= GENERATION_LIMIT) {
      return res.status(429).json({
        message: "Recipe generation limit reached.",
      });
    }

    // check in db if a recipe with the same name already exists (optional, can be skipped if you want to allow duplicates)
    
    const existing = await RecipeModel.findOne({ title: recipeName });
    if (existing && existing.contentStatus === "complete") {
      return res.status(400).json({ existing });
    }

    if (existing && existing.contentStatus === "partial") {
      // if recipe is in partial status then call AI to get the complete recipe and update the existing recipe in the database

      const aiData = await aiGenerate(recipeName);
      const imageUrl = await fetchRecipeImage(aiData.title);
      // only update feilds which is missing in the partial recipes
      existing.ingredients = aiData.ingredients;
      existing.instructions = aiData.instructions;
      existing.imageUrl = imageUrl;
      existing.contentStatus = "complete";
      existing.source = "ai";
      existing.nutrition = aiData.nutrition;
      existing.substitutions = aiData.substitutions;
      existing.viewCount += 1; // increment view count when recipe is updated
      await existing.save();
      return res.status(200).json({ recipe: existing });
    }

    // if recipe is not exist in db

    // call AI

    const aiData = await aiGenerate(recipeName);

    // get image url from unsplash based on the recipe name

    const imageUrl = await fetchRecipeImage(aiData.title);

    const { rating: aiRating, ...aiDataClean } = aiData;
    const recipe = await RecipeModel.create({
      ...aiDataClean,
      averageRating: aiRating || 0,
      author: req.userId,
      isPublic: true,
      imageUrl: imageUrl,
      source: "ai",
    });

    req.user.usage.recipeGenerationCount += 1; // increment the recipe generation count for the user

    await req.user.save();

    res.status(201).json({ recipe });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ message: "Failed to generate recipe , Try Again" });
  }
};

const rateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const { rating } = req.body;

    // validate the rating using zod schema and return error if validation fails
    const result = rateRecipeSchema.safeParse({ rating });
    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Upsert: remove existing → push new
    recipe.ratings = recipe.ratings.filter(
      (r) => r.user.toString() !== req.userId.toString(),
    );
    recipe.ratings.push({ user: req.userId, value: rating });

    // Recalculate average
    let total = 0;
    for (const r of recipe.ratings) total += r.value;
    recipe.averageRating =
      Math.round((total / recipe.ratings.length) * 10) / 10;

    await recipe.save();
    res.status(200).json({ message: "Recipe rated successfully" });
  } catch (error) {
    console.error("Error rating recipe:", error);
    res.status(500).json({ message: "Failed to rate recipe , Try Again" });
  }
};

export {
  createRecipe,
  deleteRecipe,
  generateRecipe,
  getRecipeById,
  getRecipes,
  rateRecipe,
  suggestRecipes,
};


