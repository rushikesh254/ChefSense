import PantryItemModel from "../models/pantryItem.model.js";
import UserModel from "../models/user.model.js";
import { scanPantryImage } from "../services/ai.service.js";
import { fetchPantryImage } from "../services/image.service.js";
import calculateExpiryStatus from "../utils/expiry.js";
import {
  bulkAddSchema,
  pantryItemSchema as pantryItemCreateSchema,
} from "../validation/pantry.js";

const SCAN_LIMIT = 100;
// get all pantry items for a user
// GET /api/pantry
const getItems = async (req, res) => {
  try {
    const items = await PantryItemModel.find({ owner: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch pantry items", error: error.message });
  }
};

// add a new pantry item
// POST /api/pantry
const addItem = async (req, res) => {
  try {
    const result = pantryItemCreateSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    const { name, quantity, category, expiryDate } = result.data;

    // convert expiryDate to Date object if it's provided, otherwise set it to null
    const date = expiryDate ? new Date(expiryDate) : null;

    // get image url from unsplash

    const imageUrl = await fetchPantryImage(name);

    const newItem = await PantryItemModel.create({
      name,
      quantity: quantity || "",
      category: category || "pantry",
      expiryDate: date,
      expiryStatus: calculateExpiryStatus(date),
      owner: req.userId,
      imageUrl: imageUrl,
    });

    // increment pantry items count for the user

    await UserModel.findByIdAndUpdate(req.userId, {
      $inc: { "usage.pantryItemCount": 1 },
    });

    res.status(201).json(newItem);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add pantry item", error: error.message });
  }
};

// update a pantry item by its ID
// PUT /api/pantry/:id
const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, quantity, category, expiryDate } = req.body;

    const item = await PantryItemModel.findOne({
      _id: itemId,
      owner: req.userId,
    });

    if (!item) {
      return res.status(404).json({ message: "Pantry item not found" });
    }

    if (name && name !== item.name) {
      item.name = name;
      // Fetch new image URL if name changes
      item.imageUrl = await fetchPantryImage(name);
    }
    if (quantity !== undefined) item.quantity = quantity; // allow empty string for quantity
    if (category) item.category = category;
    if (expiryDate !== undefined) {
      item.expiryDate = expiryDate ? new Date(expiryDate) : null;
      item.expiryStatus = calculateExpiryStatus(item.expiryDate);
    }

    await item.save();

    res.status(200).json(item);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update pantry item", error: error.message });
  }
};

// delete a pantry item by its ID
// DELETE /api/pantry/:id
const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    const item = await PantryItemModel.findOneAndDelete({
      _id: itemId,
      owner: req.userId,
    });

    if (!item) {
      return res.status(404).json({ message: "Pantry item not found" });
    }

    await UserModel.findByIdAndUpdate(req.userId, {
      $inc: { "usage.pantryItemCount": -1 },
    });

    res.status(200).json({ message: "Pantry item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete pantry item", error: error.message });
  }
};

// scan an image and return detected ingredients (no save)
const scanImage = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "image file is required" });

    if (req.user.usage.scanCount >= SCAN_LIMIT) {
      return res.status(429).json({ error: "scan limit reached" });
    }

    const items = await scanPantryImage(req.file.buffer, req.file.mimetype);

    req.user.usage.scanCount += 1;
    await req.user.save();

    res.status(200).json({ items, scanCount: req.user.usage.scanCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to scan pantry image", error: error.message });
  }
};

// add multiple pantry items in bulk
// POST /api/pantry/bulk
const addItemsBulk = async (req, res) => {
  try {
    const result = bulkAddSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    const { items } = result.data;

    const docs = await Promise.all(
      items.map(async (item) => {
        if (!item.name) {
          throw new Error("Item name is required");
        }

        const date = item.expiryDate ? new Date(item.expiryDate) : null;

        const imageUrl = await fetchPantryImage(item.name);

        return {
          name: item.name,
          quantity: item.quantity || "",
          category: item.category || "pantry",
          expiryDate: date,
          expiryStatus: calculateExpiryStatus(date),
          owner: req.userId,
          imageUrl,
        };
      }),
    );

    const created = await PantryItemModel.insertMany(docs);

    await UserModel.findByIdAndUpdate(req.userId, {
      $inc: { "usage.pantryItemCount": items.length },
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add pantry items in bulk",
      error: error.message,
    });
  }
};

export { addItem, addItemsBulk, deleteItem, getItems, scanImage, updateItem };
