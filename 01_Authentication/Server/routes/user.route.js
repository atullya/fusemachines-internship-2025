import express from "express";
import {
  loginUser,
  logout,
  registerUser,
} from "../controller/userController.js";
const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logout);

export default userRoutes;
