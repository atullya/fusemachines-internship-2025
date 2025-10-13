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
import { authorize } from "../middleware/authorize";

const adminRoutes = express.Router();

adminRoutes.post(
  "/add",
  authMiddleware,
  authorize("create", "Product"),
  asyncHandler(addNewProduct)
);
adminRoutes.get(
  "/display",
  authMiddleware,
  authorize("read", "Product"),
  asyncHandler(getAllProduct)
);
adminRoutes.put(
  "/update/:id",
  authMiddleware,
  authorize("update", "Product"),
  asyncHandler(updateProduct)
);
adminRoutes.delete(
  "/delete/:id",
  authMiddleware,
  authorize("delete", "Product"),
  asyncHandler(deleteProduct)
);

adminRoutes.get("/refresh", asyncHandler(refreshAccessToken));
export default adminRoutes;
