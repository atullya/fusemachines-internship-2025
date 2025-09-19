import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import User from "../models/user.model.js";
const authRoutes = express.Router();

authRoutes.get("/welcome", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    const userDetails = await User.findById({ _id: userId });
    // console.log(userDetails);
    return res.status(200).json({ message: "Welcome", user: userDetails });
  } catch (error) {
    console.log(error);
  }
});

export default authRoutes;
