import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { asyncHandler } from "../middleware/errorHandler";
import {
  addNewProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../controllers/admin.controller";
import { checkAdmin } from "../middleware/adminMiddleware";
import { refreshAccessToken } from "../controllers/token.controller";

const adminRoutes = express.Router();

adminRoutes.post(
  "/add",
  authMiddleware,
  checkAdmin,
  asyncHandler(addNewProduct)
);
adminRoutes.get(
  "/display",
  authMiddleware,
  checkAdmin,
  asyncHandler(getAllProduct)
);
adminRoutes.put(
  "/update/:id",
  authMiddleware,
  checkAdmin,
  asyncHandler(updateProduct)
);
adminRoutes.delete(
  "/delete/:id",
  authMiddleware,
  checkAdmin,
  asyncHandler(deleteProduct)
);

adminRoutes.get("/refresh", asyncHandler(refreshAccessToken));
export default adminRoutes;
