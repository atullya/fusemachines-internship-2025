import express from "express"
import { asyncHandler } from "../middleware/errorHandler";
import { changePassword, checkAuth, dashboard, loginUser, logout, registerUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRoutes=express.Router();

userRoutes.post('/register',asyncHandler(registerUser))
userRoutes.post('/login',asyncHandler(loginUser))
userRoutes.get('/logout',asyncHandler(logout))
userRoutes.get('/welcome',authMiddleware,asyncHandler(dashboard ))
userRoutes.get('/check',authMiddleware,asyncHandler(checkAuth ))
userRoutes.post('/changePassword',authMiddleware,asyncHandler(changePassword ))


export default userRoutes;