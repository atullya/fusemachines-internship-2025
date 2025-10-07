import express, { Request, Response } from "express";
import Product from "../models/product.model";
import { logger } from "../config/logger";
export const displayAllProduct = async (req: Request, res: Response) => {
  logger.info("Fetching all product...");
  const data = await Product.find({});
  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: "No product found" });
  }
  return res.status(200).json({ success: true, product: data });
};

export const findProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const productById = await Product.findById(id);
  if (!productById) {
    return res
      .status(400)
      .json({ success: false, message: "No product found with the ID" });
  }
  return res.status(200).json({ success: true, product: productById });
};
