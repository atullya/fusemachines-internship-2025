const mongoose = require("mongoose");
const logger = require("../config/logger");
const connectDb = async () => {
  try {
    const conn = mongoose.connect("mongodb://127.0.0.1:27017/ImportantConcept");
    logger.info("✅ MongoDB connected successfully");
  } catch (error) {
    logger.error(`❌ MongoDB connection error: ${error.message}`);

    // Option 1: Exit process (common for startup failures)
    process.exit(1);
  }
};
module.exports = { connectDb };
