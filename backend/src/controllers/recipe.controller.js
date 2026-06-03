import RecipeModel from "../models/recipe.model.js";

//  get all recipes from the database and return them in the response
//GET /api/recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find().sort({ createdAt: -1 }); // Sort by creation date (newest first)
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
    const data = req.body;

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
      prepTime: data.prepTime || 0,
      cookTime: data.cookTime || 0,
      servings: data.servings || 1,
      imageUrl: data.imageUrl || "",
      isVeg: data.isVeg || false,
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

export { createRecipe, deleteRecipe, getRecipeById, getRecipes };

// create 1 recipoe
// delete 1 recipe
// get 1 recipe
// get all recipes
