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

    usage: {
      scanCount: { type: Number, default: 0 },
      recipeGenerationCount: { type: Number, default: 0 },
    },

    // TODO: add saved recipes later
  },
  {
    timestamps: true,
  },
);

// hash password using bcrypt before saving the user (prehook)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return; // Only hash the password if it has been modified (or is new)
  this.password = await bcrypt.hash(this.password, 10); //  10 salt rounds
});

userSchema.methods.checkPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password); // Compare the provided password with the hashed password in the database
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
