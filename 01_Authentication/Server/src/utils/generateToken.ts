import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateToken = (userId: string, res: Response) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,                  // cookie can’t be accessed via JavaScript (XSS safe)
    sameSite: "strict",              // CSRF protection
    secure: process.env.NODE_ENV !== "development", // cookie only sent over HTTPS in prod
  });

  return token;
};