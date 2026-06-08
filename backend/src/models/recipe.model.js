import mongoose from "mongoose";

// ingredients sub document
const ingredientSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    amount: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "other",
    },
  },
  {
    _id: false, // disable _id for subdocuments to avoid unnecessary ObjectIds for each ingredient
  },
);

// instructions sub doc

const instructionSchema = new mongoose.Schema(
  {
    step: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      default: "",
    },
    instruction: {
      type: String,
      default: "",
    },
    tip: {
      type: String,
      default: "",
    },
  },
  {
    _id: false, // disable _id for subdocuments to avoid unnecessary ObjectIds for each instruction
  },
);

// nutrition sub doc (can be extended later with more fields like vitamins, minerals, etc.)
const nutritionSchema = new mongoose.Schema(
  {
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
  },
  { _id: false },
);

// substitution sub doc (can be used if some items are present)
const substitutionSchema = new mongoose.Schema(
  {
    original: { type: String, default: "" },
    alternatives: { type: [String], default: [] },
  },
  { _id: false },
);

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
    // array of ingredient subdocuments
    ingredients: {
      type: [ingredientSchema],
      default: [],
    },
    instructions: {
      type: [instructionSchema],
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
    difficulty: {
      type: String,
      default: "medium",
    },
    tags: {
      type: [String],
      default: [],
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
    ratings: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    isVeg: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },

    nutrition: {
      type: nutritionSchema,
      default: () => ({}), // default to an empty object to avoid null values
    },

    substitutions: {
      type: [substitutionSchema],
      default: [],
    },

    tips: { type: [String], default: [] },

    source: {
      type: String,
      default: "user", // user,ai,seed
    }, // reference to the user who created the recipe(relationship between recipe and user) like foreign key in relational databases (IMP)
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const RecipeModel = mongoose.model("Recipe", recipeSchema); // recipe collection in the database will be named "recipes" (Mongoose pluralizes the model name)

export default RecipeModel;

// TODO: add indexes later for faster search on fields
