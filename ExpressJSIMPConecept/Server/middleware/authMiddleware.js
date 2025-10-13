const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes using access token
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token not found" });
    }

    // Verify access token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);

    // Get user from DB
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // Attach user to request object
    req.user = user;

    next();
  } catch (err) {
    console.error("AuthMiddleware error:", err);
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid or expired token" });
  }
};

module.exports = authMiddleware;
