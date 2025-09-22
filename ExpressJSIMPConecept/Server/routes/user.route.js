const express = require("express");
const { asyncHandler, APIError } = require("../middleware/errorHandler");
const { registerUser, loginUser, logoutUser } = require("../controller/userController");

const userRoute = express.Router();

// Define route - only wrap ONCE with asyncHandler
userRoute.post("/register", asyncHandler(registerUser));
userRoute.post("/login", asyncHandler(loginUser));
userRoute.get("/logout", asyncHandler(logoutUser));

module.exports = userRoute;
