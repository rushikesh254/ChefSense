import PantryItemModel from "../models/pantryItem.model.js";
import { fetchPantryImage } from "../services/image.service.js";
import calculateExpiryStatus from "../utils/expiry.js";

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
    const { name, quantity, category, expiryDate } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Item name is required" });
    }

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

    const item = await PantryItemModel.findById({
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

    res.status(200).json({ message: "Pantry item deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete pantry item", error: error.message });
  }
};

export { addItem, deleteItem, getItems, updateItem };
