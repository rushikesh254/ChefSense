import UserModel from "../models/user.model.js";

// UPDATE PROFILE (allow user to update firstName, lastName and avatarUrl)
const updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { firstName, lastName, avatarUrl } = req.body;

    // Update user profile
    req.user.firstName = firstName || req.user.firstName;
    req.user.lastName = lastName || req.user.lastName;
    req.user.avatarUrl = avatarUrl || req.user.avatarUrl;

    await req.user.save();
    res.json({
      message: "Profile updated successfully",
      user: {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        avatarUrl: req.user.avatarUrl,
        pantryItemCount: req.user.usage.pantryItemCount,
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

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    const user = await UserModel.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Google-only users must verify via current password after setting one
    if (!user.password) {
      return res.status(400).json({
        message: "Your account uses Google sign-in. Please set a password through profile settings first.",
      });
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

export { getUsage, updatePassword, updateProfile };
