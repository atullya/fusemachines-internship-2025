import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Retrieve the JWT from cookies
    const token = req.cookies?.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Token not found" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const userDetail = await User.findById(decoded.userId);

    if (!userDetail) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // Attach the user to the request object for use in the next middleware or route handler
    req.user = userDetail;

    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
