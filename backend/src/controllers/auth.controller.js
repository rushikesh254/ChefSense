import UserModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

//SIGNUP
const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }
    // check email already exist or not
    const exists = await UserModel.findOne({ email: email.tolowerCase() });
    if (exists) return res.status(400).json({ error: "user already exists" });

    //  add user to db
    const user = await UserModel.create({
      email,
      password: hashed,
      firstName: firstName || "",
      lastName: lastName || "",
    });

    //create token and add to cookie
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      // secure: true  // turn this on in prod
    });

    console.log("new user:", user.email);
    // send res
    res.status(201).json({
      message: "User created successfully",
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Error registering user: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

//LOGIN

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user by email
    const user = await UserModel.findOne({
      email: String(email || "").toLowerCase(),
    });
    if (!user) return res.status(400).json({ error: "no user found" });

    // compare password
    const isMatch = await user.checkPassword(password);
    if (!isMatch) return res.status(400).json({ error: "Wrong Password" });

    // create new token and add to cookie
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      // secure: true  // turn this on in prod
    });

    console.log("user logged in:", user.email);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Error logging in user: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

//LOGOUT ==> For logout, we can simply clear the token cookie by setting it to an empty value and an immediate expiration date.

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

//send user details
const me = async (req, res) => {
  res.json({ user: req.user });
};

export { login, logout, me, signup };
