import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import partialRecipes from "../data/partialRecipes.js";
import connectToDB from "../src/db/db.js";
import RecipeModel from "../src/models/recipe.model.js";
import UserModel from "../src/models/user.model.js";

const SEED_EMAIL = "chefsense@gmail.com";
const seedRecipes = async () => {
  await connectToDB(); // Connect to the database

  let user = await UserModel.findOne({ email: SEED_EMAIL });
  if (!user) {
    user = await UserModel.create({
      email: SEED_EMAIL,
      password: "passwrod123",
      firstName: "Chef",
      lastName: "Sense",
    });
  }

  // Remove any previously seeded recipes to allow clean re-seed
  await RecipeModel.deleteMany({ source: "seed" });

  const docs = partialRecipes.map((recipe) => ({
    title: recipe.title,
    description: recipe.description,
    cuisine: recipe.cuisine,
    category: recipe.category,
    diet: recipe.diet,
    difficulty: recipe.difficulty,
    tags: recipe.tags || [],
    prepTime: recipe.prepTime || 0,
    cookTime: recipe.cookTime || 0,
    servings: recipe.servings || 2,
    isVeg: !!recipe.isVeg,
    isPublic: recipe.isPublic !== false,
    imageUrl: recipe.imageUrl || "",
    source: "seed",
    contentStatus: "partial",
    seedId: recipe.id || null,
    author: user._id,
  }));

  await RecipeModel.insertMany(docs); // Insert the recipes into the database

  console.log("Database seeded successfully");
  process.exit(0); // Exit the process after seeding
};

seedRecipes()
  .catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1); // Exit with an error code
  })
  .finally(() => {
    mongoose.connection.close(); // Close the database connection
  });

// run "npm run seed " to seed the database with the recipes from partialRecipes array in data folder (this will create a user
