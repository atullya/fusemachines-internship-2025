
import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error(" MONGO_URI not found in environment variables");
    }
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connection successful!!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};