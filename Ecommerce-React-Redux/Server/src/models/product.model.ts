import mongoose from "mongoose";

// Define the product schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Number, required: true, default: Date.now }, // Assuming date is a timestamp
  },
  { timestamps: true }
); // Automatically manage createdAt and updatedAt fields
export default mongoose.model("Product", productSchema);
// Create the model
