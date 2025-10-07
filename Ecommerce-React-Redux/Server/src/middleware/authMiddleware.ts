import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";

interface JwtPayloadCustom extends jwt.JwtPayload {
  userId: string;
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) {
    logger.error("Unauthorized - Token not found");
    return res
      .status(401)
      .json({ success: false, message: "Access token missing" });
  }
  try {
    const decodeToken = jwt.verify(
      token,
      process.env.JWT_SECRET_ACCESS_TOKEN!
    ) as JwtPayloadCustom;

    if (!decodeToken?.userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const userDetail = await User.findById(decodeToken.userId);
    if (!userDetail) {
      logger.error("Unauthorized - User not found");
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = userDetail;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Access token expired" });
    }
    return res
      .status(403)
      .json({ success: false, message: "Invalid access token" });
  }
};
