import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { asyncHandler } from "../middleware/errorHandler";
import {
  displayAllProduct,
  findProductById,
} from "../controllers/auth.controller";
import { refreshAccessToken } from "../controllers/token.controller";

const authRoutes = express.Router();

authRoutes.get("/display", authMiddleware, asyncHandler(displayAllProduct));
authRoutes.get("/product/:id", authMiddleware, asyncHandler(findProductById));
authRoutes.get("/refresh", asyncHandler(refreshAccessToken));
export default authRoutes;
