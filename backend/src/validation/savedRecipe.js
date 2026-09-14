import z from "zod";

export const recipeIdParamSchema = z.object({
  recipeId: z.string().min(1, "Recipe ID is required"),
});
