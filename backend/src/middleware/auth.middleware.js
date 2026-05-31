import jwt from "jsonwebtoken";

// middlware
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "no token, please login" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("token bad", error.message);
    return res.status(401).json({ error: "bad token" });
  }
}

export default authMiddleware;
