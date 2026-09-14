import z from "zod";

export const pantryItemSchema = z.object({
  name: z.string().min(1, "Item name is required").max(50),
  quantity: z.string().max(30).optional().default(""),
  category: z.string().optional().default("pantry"),
  expiryDate: z.string().nullable().optional(),
  expiryStatus: z.string().optional(),
});

export const bulkAddSchema = z.object({
  items: z
    .array(pantryItemSchema)
    .min(1, "items array cannot be empty")
    .max(50, "Cannot add more than 50 items at once"),
});
