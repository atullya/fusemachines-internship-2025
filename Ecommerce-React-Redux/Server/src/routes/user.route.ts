import express from "express";
import { asyncHandler } from "../middleware/errorHandler";
import {
  checkAuth,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../middleware/authMiddleware";
import { refreshAccessToken } from "../controllers/token.controller";

const userRoute = express.Router();

userRoute.post("/register", asyncHandler(registerUser));
userRoute.post("/login", asyncHandler(loginUser));
userRoute.get("/logout", asyncHandler(logoutUser));
userRoute.get("/check", authMiddleware, asyncHandler(checkAuth));
userRoute.get("/refresh", asyncHandler(refreshAccessToken)); // 👈 added
export default userRoute;
