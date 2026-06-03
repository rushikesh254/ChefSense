import jwt from "jsonwebtoken";

// middleware
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "no token, please login" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // add userId to req object for use in controllers
    next();
  } catch (error) {
    console.log("token bad", error.message);
    return res.status(401).json({ error: "bad token" });
  }
}

export default authMiddleware;

// this middleware checks for the presence of a JWT token in the cookies, verifies it, and if valid, extracts the userId and attaches it to the req object for use in subsequent controllers. If the token is missing or invalid, it returns a 401 Unauthorized response.
