import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password is required")
    .max(100, "Password is too long"),
});

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password is required")
    .max(100, "Password is too long"),
  firstName: z.string().optional().default(""),
  lastName: z.string().optional().default(""),
});


