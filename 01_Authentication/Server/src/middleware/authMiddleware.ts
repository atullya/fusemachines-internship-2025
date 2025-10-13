import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { logger } from "../config/logger";
import User from "../models/user.model";

// Extend the JWT payload to include our custom userId
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

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      logger.error("Unauthorized - Token not found");
      return res.status(401).json({ message: "Unauthorized - Token not found" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadCustom;

    if (!decodedToken?.userId) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const userDetail = await User.findById(decodedToken.userId);

    if (!userDetail) {
      logger.error("Unauthorized - User not found");
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = userDetail; 
    next();
  } catch (error) {
    logger.error("Unauthorized - Token error");
    return res.status(401).json({ message: "Unauthorized" });
  }
};