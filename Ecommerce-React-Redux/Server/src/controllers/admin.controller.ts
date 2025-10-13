import { Request, Response } from "express";
import { logger } from "../config/logger";
import Product from "../models/product.model";

export const addNewProduct = async (req: Request, res: Response) => {
  logger.info("Adding New Product....");
  const { name, description, price, category } = req.body;
  if (!name || !description || !price || !category) {
    return res.status(400).json({
      message: "All fields are required, including at least one image!",
    });
  }
  const newProduct = new Product({
    name,
    description,
    price,
    category,
  });
  const insertProduct = newProduct.save();
  if (!insertProduct) {
    logger.error("Failed to add a product");
    return res.status(400).json({
      success: false,
      message: "Failed to add a product!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "New Product added successfully!",
    data: {
      name,
      description,
      price,
      category,
    },
  });
};

export const getAllProduct = async (req: Request, res: Response) => {
  const products = await Product.find({});
  if (!products) {
    return res.status(400).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Successfully fetched all products!",
    data: products,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  logger.info("Updating Product...");
  const { id } = req.params;
  const { name, description, price, category } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required" });
  }

  const updated = await Product.findByIdAndUpdate(
    id,
    { name, description, price, category },
    { new: true, runValidators: true }
  );

  if (!updated) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  logger.info(`Product ${id} updated successfully`);
  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updated,
  });
};

export const deleteProduct = async (req: Request, res: Response) => {
  logger.info("Deleting Product...");
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required" });
  }

  const deleted = await Product.findByIdAndDelete(id);

  if (!deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Product not found" });
  }

  logger.info(`Product ${id} deleted successfully`);
  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
    data: deleted,
  });
};
