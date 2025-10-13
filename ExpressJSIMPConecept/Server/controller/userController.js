const logger = require("../config/logger");
const User = require("../models/User");
const accessAndRefreshToken = require("../utils/generateAccessandRefreshToken");

// ---------------- REGISTER ----------------
const registerUser = async (req, res) => {
  logger.info("Registering User Route");
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    logger.warn("User already exists with that email");
    return res.status(400).json({
      success: false,
      message: "User already exists with that email",
    });
  }

  const registerNewUser = new User({ name, email, password });
  const insertNewUser = await registerNewUser.save();

  if (insertNewUser) {
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: insertNewUser,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Registration Failed!!",
    });
  }
};

// ---------------- LOGIN ----------------
const loginUser = async (req, res) => {
  logger.info("Logging User..");
  const { email, password } = req.body;

  if (!email || !password) {
    logger.error("All Fields are required!!");
    return res.status(400).json({
      success: false,
      message: "All Fields are required",
    });
  }

  const findUser = await User.findOne({ email });
  if (!findUser) {
    return res.status(404).json({
      success: false,
      message: "Invalid Credentials",
    });
  }

  const isMatch = await findUser.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }

  // generate tokens
  const { accessToken, refreshToken } = await accessAndRefreshToken(
    findUser._id,
    res
  );

  logger.info("User logged in successfully");

  return res.status(200).json({
    success: true,
    _id: findUser._id,
    username: findUser.name,
    email: findUser.email,
    accessToken,
    refreshToken,
  });
};

// ---------------- LOGOUT ----------------
const logoutUser = async (req, res) => {
  logger.info("Logging out user..");

  // If you’re storing refresh tokens in DB → clear it
  // await User.findByIdAndUpdate(req.user._id, { refreshToken: null });

  // Clear cookies (if tokens stored in cookies)
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = { registerUser, loginUser, logoutUser };
