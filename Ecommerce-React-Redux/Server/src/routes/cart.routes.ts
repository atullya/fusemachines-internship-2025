import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { addToCart, updateCartQuantity } from "../controllers/cart.controller";
import { asyncHandler } from "../middleware/errorHandler";

const cartRoutes = express.Router();

cartRoutes.post("/add-to-cart", authMiddleware, asyncHandler(addToCart));
cartRoutes.post(
  "/update-cart/:id",
  authMiddleware,
  asyncHandler(updateCartQuantity)
);

export default cartRoutes;
