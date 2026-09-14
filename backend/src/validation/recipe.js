import z from "zod";

export const rateRecipeSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
});

export const generateRecipeSchema = z.object({
  recipeName: z.string().min(1, "recipeName is required").max(100),
  forceRegenerate: z.boolean().optional(),
});

const ingredientSchema = z.object({
  item: z.string().optional().default(""),
  amount: z.string().optional().default(""),
  category: z.string().optional().default("other"),
});

const instructionSchema = z.object({
  step: z.number().optional().default(1),
  title: z.string().optional().default(""),
  instruction: z.string().optional().default(""),
  tip: z.string().optional().default(""),
});

export const createRecipeSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional().default(""),
  ingredients: z.array(ingredientSchema).optional().default([]),
  instructions: z.array(instructionSchema).optional().default([]),
  cuisine: z.string().optional().default(""),
  category: z.string().optional().default(""),
  diet: z.string().optional().default(""),
  difficulty: z.string().optional().default("medium"),
  tags: z.array(z.string()).optional().default([]),
  prepTime: z.number().optional().default(0),
  cookTime: z.number().optional().default(0),
  servings: z.number().optional().default(1),
  imageUrl: z.string().optional().default(""),
  isVeg: z.boolean().optional().default(false),
  isPublic: z.boolean().optional().default(true),
});
