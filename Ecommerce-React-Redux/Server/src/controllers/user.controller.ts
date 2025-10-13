import { Request, Response } from "express";
import { logger } from "../config/logger";
import { User } from "../models/user.model";
import { accessAndRefreshToken } from "../utils/generateAccessAndRefereshToken";
import { RefereshToken } from "../models/refereshToken";

export const registerUser = async (req: Request, res: Response) => {
  logger.info("Registering New User....");
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All Fields are required" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.warn("User already exists with that email");
    return res.status(400).json({
      success: false,
      message: "User already exists with that email",
    });
  }
  const registerNewUser = new User({ name, email, password, role });
  const insertNewUser = await registerNewUser.save();

  if (!insertNewUser) {
    return res.status(401).json({
      success: false,
      message: "Registration Failed!!",
    });
  }
  return res.status(201).json({
    success: true,
    message: "Registration successful",
    user: insertNewUser,
  });
};

export const loginUser = async (req: Request, res: Response) => {
  logger.info("Logging User....");
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All Fields are required" });
  }
  const findUser = await User.findOne({ email });
  if (!findUser) {
    return res.status(404).json({
      success: false,
      message: "Invalid Credentials",
    });
  }
  const isMatch = await findUser.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }
  const { accessToken, refreshToken } = await accessAndRefreshToken(
    findUser._id.toString(),
    res
  );
  logger.info("User logged in successfully");
  return res.status(200).json({
    success: true,
    _id: findUser._id,
    username: findUser.name,
    email: findUser.email,
    role: findUser.role,
    accessToken,
    refreshToken,
  });
};

export const logoutUser = async (req: Request, res: Response) => {
  logger.info("Logging out user..");

  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    await RefereshToken.deleteOne({ token: refreshToken }); // ❗ remove from DB
  }

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const checkAuth = async (req: Request, res: Response) => {
  return res.status(200).json(req.user);
};
