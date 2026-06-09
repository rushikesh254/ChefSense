import UserModel from "../models/user.model.js";

// GET PROFILE (send user data from req.user which is set by auth middleware)
const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { email, firstName, lastName, avtarUrl, pantryItemsCount, usage } =
      req.user;

    res.json({
      email,
      firstName,
      lastName,
      avtarUrl,
      pantryItemsCount,
      usage,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE PROFILE (allow user to update firstName, lastName and avtarUrl)
const updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { firstName, lastName, avtarUrl } = req.body;

    // Update user profile
    req.user.firstName = firstName || req.user.firstName;
    req.user.lastName = lastName || req.user.lastName;
    req.user.avtarUrl = avtarUrl || req.user.avtarUrl;

    await req.user.save();
    res.json({
      message: "Profile updated successfully",
      user: {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        avtarUrl: req.user.avtarUrl,
        pantryItemsCount: req.user.pantryItemsCount,
        usage: req.user.usage,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getUsage = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { usage } = req.user;
    res.json({ usage });
  } catch (error) {
    console.error("Error fetching usage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { currentPassword, newPassword } = req.body;

    const user = await UserModel.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await user.checkPassword(currentPassword);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getProfile, getUsage, updatePassword, updateProfile };
