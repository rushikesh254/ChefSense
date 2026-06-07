import recipeModel from "../models/recipe.model.js";
import UserModel from "../models/user.model.js";

const getSavedRecipes = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the authenticated request
    const user = await UserModel.findById(userId).populate("savedRecipes"); // Fetch the user and populate the savedRecipes field with recipe details
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Send a 404 response if the user is not found
    }
    res.json({ savedRecipes: user.savedRecipes }); // Send the saved recipes as a JSON response
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    res.status(500).json({ message: "Internal server error" }); // Send an error response if something goes wrong
  }
};

const saveRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId; // Get the recipe ID from the request parameters

    if (!recipeId) {
      return res.status(400).json({ message: "Recipe ID is required" }); // Send a 400 response if the recipe ID is not provided
    }

    const exists = await recipeModel.findById(recipeId);

    if (!exists) {
      return res.status(404).json({ message: "Recipe not found" }); // Send a 404 response if the recipe is not found
    }

    const userId = req.user._id; // Get the user ID from the authenticated request
    const user = await UserModel.findById(userId); // Fetch the user from the database
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Send a 404 response if the user is not found
    }

    if (user.savedRecipes.includes(recipeId)) {
      return res.status(400).json({ message: "Recipe already saved" }); // Send a 400 response if the recipe is already saved
    }

    user.savedRecipes.push(recipeId); // Add the recipe ID to the user's savedRecipes array
    await user.save(); // Save the updated user document
    res.json({ message: "Recipe saved successfully" }); // Send a success response
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ message: "Internal server error" }); // Send an error response if something goes wrong
  }
};

const unsaveRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId; // Get the recipe ID from the request parameters
    if (!recipeId) {
      return res.status(400).json({ message: "Recipe ID is required" }); // Send a 400 response if the recipe ID is not provided
    }
    const userId = req.user._id; // Get the user ID from the authenticated request
    const user = await UserModel.findById(userId); // Fetch the user from the database
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Send a 404 response if the user is not found
    }
    if (!user.savedRecipes.includes(recipeId)) {
      return res.status(400).json({ message: "Recipe not saved" }); // Send a 400 response if the recipe is not in the user's savedRecipes array
    }

    user.savedRecipes = user.savedRecipes.filter(
      (id) => id.toString() !== recipeId,
    ); // Remove the recipe ID from the user's savedRecipes array
    await user.save(); // Save the updated user document
    res.json({ message: "Recipe unsaved successfully" }); // Send a success response
  } catch (error) {
    console.error("Error unsaving recipe:", error);
    res.status(500).json({ message: "Internal server error" }); // Send an error response if something goes wrong
  }
};

export { getSavedRecipes, saveRecipe, unsaveRecipe };
