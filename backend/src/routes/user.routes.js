import { Router } from "express";
import {
  getUsage,
  updatePassword,
  updateProfile,
} from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = Router();

router.use(protect); // Protect all routes after this middleware

// UPDATE PROFILE
router.put("/profile", updateProfile);

// GET USAGE
router.get("/usage", getUsage);

// UPDATE PASSWORD
router.put("/password", updatePassword);

export default router;
