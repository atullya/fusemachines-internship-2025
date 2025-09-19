import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = mongoose.connect("mongodb://127.0.0.1:27017/Internship");
    console.log("MongoDB connection successful!!");
  } catch (error) {
    console.log("Error", error);
  }
};
