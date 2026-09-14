import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  googleCallback,
  googleRedirect,
  login,
  logout,
  me,
  signup,
} from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = Router();

// Stricter rate limit for auth endpoints to prevent brute-force attacks
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many attempts. Please try again later." },
});

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/logout", authLimiter, logout);

router.get("/me", protect, me);

// Google OAuth routes
router.get("/google", googleRedirect);
router.get("/google/callback", googleCallback);

export default router;
