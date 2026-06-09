import { Router } from "express";
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

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protect, me);

// Google OAuth routes
router.get("/google", googleRedirect);
router.get("/google/callback", googleCallback);

export default router;
