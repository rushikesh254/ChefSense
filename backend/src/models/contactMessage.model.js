import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  },
);

const ContactMessageModel = mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessageModel;
