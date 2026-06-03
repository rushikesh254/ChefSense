import mongoose from "mongoose";

const pantrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: String,
      default: "",
    },
    category: {
      // diary,meat,vegetables,fruits,grains,other etc
      type: String,
      default: "pantry",
    },
    expiryDate: {
      type: Date,
    },
    expiryStatus: {
      // expired, expiring soon, fresh, no expiry
      type: String,
      default: "no expiry",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PantryItemModel = mongoose.model("PantryItem", pantrySchema);

export default PantryItemModel;
