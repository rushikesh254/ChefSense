import Router from "express";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/pantry.controller.js";
import protect from "../middleware/auth.middleware.js"; // this is the auth middleware to protect routes (it checks for a valid JWT token  so user is authenticated or not)

const router = Router();

router.use(protect); // this will protect all routes below it, so only authenticated users can access them

router.get("/", getItems);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;
