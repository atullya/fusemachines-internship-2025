import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { asyncHandler } from "../middleware/errorHandler";
import {
  displayAllProduct,
  findProductById,
} from "../controllers/auth.controller";
import { refreshAccessToken } from "../controllers/token.controller";
import { authorize } from "../middleware/authorize";

const authRoutes = express.Router();
authRoutes.get(
  "/display",
  authMiddleware,
  authorize("read", "Product"),
  asyncHandler(displayAllProduct)
);
authRoutes.get(
  "/product/:id",
  authMiddleware,
  authorize("read", "Product"),
  asyncHandler(findProductById)
);
authRoutes.get("/refresh", asyncHandler(refreshAccessToken));
export default authRoutes;
