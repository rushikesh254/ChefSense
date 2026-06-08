import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectToDB from "../src/db/db.js";
import RecipeModel from "../src/models/recipe.model.js";

const unseedRecipes = async () => {
  await connectToDB();

  const result = await RecipeModel.deleteMany({});
  console.log(`Deleted ${result.deletedCount} recipes from the database`);

  process.exit(0);
};

unseedRecipes()
  .catch((err) => {
    console.error("Error unseeding database:", err);
    process.exit(1);
  })
  .finally(() => {
    mongoose.connection.close();
  });
