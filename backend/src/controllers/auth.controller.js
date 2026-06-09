import crypto from "crypto";
import UserModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

// Helper function to set auth cookie
const setAuthCookie = (res, user) => {
  const token = generateToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // secure: true  // turn this on in prod
    sameSite: "lax", // Add sameSite attribute for better security (prevents CSRF and browser compatible)
  });
};

//SIGNUP
const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password must be at least 6 characters" });
    }

    // check email already exist or not
    const exists = await UserModel.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ error: "user already exists" });

    //  add user to db
    const user = await UserModel.create({
      email,
      password,
      firstName: firstName || "",
      lastName: lastName || "",
    });

    // set auth cookie with token
    setAuthCookie(res, user);

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

    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    // find user by email
    const user = await UserModel.findOne({
      email: String(email || "").toLowerCase(),
    }).select("+password"); // explicitly select password since it's excluded by default in the schema

    if (!user) return res.status(400).json({ error: "no user found" });

    if (user.provider !== "local") {
      return res.status(400).json({
        error: `This account uses ${user.provider}. Please sign in with ${user.provider}.`,
      });
    }

    // compare password
    const isMatch = await user.checkPassword(password);
    if (!isMatch) return res.status(400).json({ error: "Wrong Password" });

    // create new token and add to cookie
    setAuthCookie(res, user);

    console.log("user logged in:", user.email);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
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
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" }); // Clear the token cookie
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

const googleRedirect = (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.redirect(
      `${frontendUrl}/sign-in?error=google_oauth_not_configured`,
    );
  }

  const backendUrl =
    process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 1337}`;

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${backendUrl}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    prompt: "consent",
  });

  res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
  );
};

// This is the callback endpoint that Google will redirect to after the user authorizes the app. It will exchange the authorization code for an access token, retrieve the user's profile information, and then log the user in or create a new account if necessary.
const googleCallback = async (req, res) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const backendUrl =
    process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 1337}`;

  try {
    const code = req.query.code;

    if (!code) throw new Error("No OAuth code");

    // exchange code for token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${backendUrl}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) throw new Error("Token exchange failed");

    // get user info
    const profileRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } },
    );

    const profile = await profileRes.json();
    if (!profile.email) throw new Error("No email from Google");

    const email = String(profile.email).toLowerCase();
    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        email,
        password: crypto.randomUUID(),
        firstName: profile.given_name || "",
        lastName: profile.family_name || "",
        provider: "google",
        providerId: String(profile.id || ""),
      });
    }

    setAuthCookie(res, user);

    res.redirect(`${frontendUrl}/dashboard`);
  } catch (err) {
    console.error("google oauth error:", err.message);
    res.redirect(`${frontendUrl}/sign-in?error=oauth_failed`);
  }
};

export { googleCallback, googleRedirect, login, logout, me, signup };
