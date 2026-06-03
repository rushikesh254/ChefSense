import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

// middleware
const protect = async (req, res, next) => {
  const token = req.cookies?.token; // get token from cookies(if it exists)
  if (!token) {
    return res.status(401).json({ error: "please login first" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.userId).select("-password"); // exclude password from user data for security)
    if (!user) {
      return res.status(401).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("token bad", error.message);
    return res.status(401).json({ error: "bad token" });
  }
};

export default protect;

// this middleware will be used in routes that require authentication. It checks for the presence of a JWT token in the cookies, verifies it, and if valid, attaches the user information to the request object for use in subsequent handlers. If the token is missing or invalid, it responds with an appropriate error message.
