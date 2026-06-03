import mongoose from "mongoose";

//  keeping it simple for now
const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      default: "",
    },
    // array  of strings for ingredients and instructions
    ingredients: {
      type: [String],
      default: [],
    },
    instructions: {
      type: [String],
      default: [],
    },
    cuisine: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    diet: {
      type: String,
      default: "",
    },
    prepTime: {
      type: Number,
      default: 0, // in minutes
    },
    cookTime: {
      type: Number,
      default: 0, // in minutes
    },
    servings: {
      type: Number,
      default: 1,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    isVeg: {
      type: Boolean,
      default: false,
    },
    // reference to the user who created the recipe(relationship between recipe and user) like foreign key in relational databases (IMP)
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const RecipeModel = mongoose.model("Recipe", recipeSchema); // recipe collection in the database will be named "recipes" (Mongoose pluralizes the model name)

export default RecipeModel;
