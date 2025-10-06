import express from "express";
import { asyncHandler } from "../middleware/errorHandler";
import { loginUser, registerUser } from "../controllers/user.controller";

const userRoute = express.Router();

userRoute.post("/register", asyncHandler(registerUser));
userRoute.post("/login", asyncHandler(loginUser));

export default userRoute;
