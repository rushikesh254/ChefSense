import { Router } from "express";
import {
  addItem,
  addItemsBulk,
  deleteItem,
  getItems,
  scanImage,
  updateItem,
} from "../controllers/pantry.controller.js";
import protect from "../middleware/auth.middleware.js"; // this is the auth middleware to protect routes (it checks for a valid JWT token  so user is authenticated or not)
import { uploadSingleImage } from "../middleware/upload.middleware.js"; // this is the multer middleware for handling file uploads, it uses memoryStorage to store the uploaded file in memory as a Buffer, and it will make the file available in req.file for the controller to process

const router = Router();

router.use(protect); // this will protect all routes below it, so only authenticated users can access them

router.get("/", getItems);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

router.post("/bulk", addItemsBulk); // this is a route for adding multiple items at once, it expects an array of items in the request body
router.post("/scan", uploadSingleImage("image"), scanImage); // this is a route for scanning an image of the pantry, it expects a multipart/form-data request with a single image file in the "image" field. The uploadSingleImage middleware will handle the file upload and make the file available in req.file for the scanImage controller to process.

export default router;
