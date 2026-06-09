import bcrypt from "bcrypt";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true, // Add an index for faster queries
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // Exclude password from query results by default
    },
    firstName: {
      type: String,
      trim: true,
      default: "",
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    pantryItemsCount: { type: Number, default: 0 }, // Count of pantry items added by the user
    usage: {
      scanCount: { type: Number, default: 0 },
      recipeGenerationCount: { type: Number, default: 0 },
      suggestionCount: { type: Number, default: 0 },
    },
    // saved recipes
    // array of recipe ids that the user has saved (when user save id of recipe will be added to this array if unsave then it will be removed from this array)
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
    avtarUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dzcmadjlq/image/upload/v1701904418/default-avatar_ajl7nq.png",
    },
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    providerId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// hash password using bcrypt before saving the user (prehook)
userSchema.pre("save", async function () {
  if (!this.password || !this.isModified("password")) return; // Only hash the password if it has been modified (or is new)
  this.password = await bcrypt.hash(this.password, 10); //  10 salt rounds
});

userSchema.methods.checkPassword = async function (pass) {
  if (!this.password) return false; // If there is no password set, return false
  return await bcrypt.compare(pass, this.password); // Compare the provided password with the hashed password in the database
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
