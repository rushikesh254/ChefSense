import ContactMessageModel from "../models/contactMessage.model.js";

const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await ContactMessageModel.create({ name, email, message });

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
};

export { submitContact };
