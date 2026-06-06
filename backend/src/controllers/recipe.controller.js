import RecipeModel from "../models/recipe.model.js";
import { generateRecipe as aiGenerate } from "../services/ai.service.js";
import { fetchRecipeImage } from "../services/image.service.js";

//  get all recipes from the database and return them in the response
//GET /api/recipes
const getRecipes = async (req, res) => {
  try {
    const q = String(req.query.q || "").trim(); // search query for recipe
    const filter = { $or: [{ isPublic: true }, { author: req.userId }] }; // filter to get public recipes or recipes created by the authenticated user

    if (q) {
      filter.title = { $regex: q, $options: "i" }; // case-insensitive search for recipe title (this will match any recipe whose title contains the search query)
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
    const data = req.body?.data || req.body; // support both { data: { ... } } and { ... } formats for request body

    if (!data.title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const recipe = await RecipeModel.create({
      title: data.title,
      description: data.description || "",
      ingredients: data.ingredients || [],
      instructions: data.instructions || [],
      cuisine: data.cuisine || "",
      category: data.category || "",
      diet: data.diet || "",
      difficulty: data.difficulty || "medium",
      tags: data.tags || [],
      prepTime: data.prepTime || 0,
      cookTime: data.cookTime || 0,
      servings: data.servings || 1,
      imageUrl: data.imageUrl || "",
      isVeg: data.isVeg || false,
      isPublic: data.isPublic !== false, // default to true if not provided or if it's not explicitly set to false
      author: req.userId, // Set the author to the authenticated user's ID

      // req.userId is set by the authMiddleware when it verifies the JWT token and extracts the user ID from it. This way, we can associate the recipe with the user who created it without relying on the client to send the author information (which could be tampered with). The server ensures that the recipe is always linked to the logged-in user, enhancing security and data integrity.
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

const generateRecipe = async (req, res) => {
  try {
    const { recipeName } = req.body;

    if (!recipeName) {
      return res.status(400).json({ message: "Recipe name is required" });
    }

    // check in db if a recipe with the same name already exists (optional, can be skipped if you want to allow duplicates)
    const existing = await RecipeModel.findOne({ title: recipeName });
    if (existing) {
      return res.status(400).json({ existing });
    }

    // call AI

    const aiData = await aiGenerate(recipeName);

    // get image url from unsplash based on the recipe name

    const imageUrl = await fetchRecipeImage(aiData.title);

    const recipe = await RecipeModel.create({
      ...aiData,
      author: req.userId,
      isPublic: true,
      imageUrl: imageUrl,
    });

    res.status(201).json({ recipe });
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).json({ message: "Failed to generate recipe , Try Again" });
  }
};

export {
  createRecipe,
  deleteRecipe,
  generateRecipe,
  getRecipeById,
  getRecipes,
};

// create 1 recipoe
// delete 1 recipe
// get 1 recipe
// get all recipes
