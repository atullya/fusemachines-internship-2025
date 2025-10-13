import jwt from "jsonwebtoken";
import { RefereshToken } from "../models/refereshToken";
import { Response } from "express";
export const accessAndRefreshToken = async (userId: string, res: Response) => {
  if (
    !process.env.JWT_SECRET_ACCESS_TOKEN ||
    !process.env.JWT_SECRET_REFRESH_TOKEN
  ) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET_ACCESS_TOKEN,
    { expiresIn: "1d" }
  );
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );
  const newRefreshToken = new RefereshToken({
    token: refreshToken,
    user: userId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  await newRefreshToken.save();
  res.cookie("accessToken", accessToken, {
    maxAge: 1 * 24 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return { accessToken, refreshToken };
};
