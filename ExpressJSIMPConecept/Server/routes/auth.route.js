const express = require("express");
const { asyncHandler, APIError } = require("../middleware/errorHandler");

const { welcome } = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

const authRoute = express.Router();

authRoute.get("/welcome", authMiddleware, asyncHandler(welcome));

module.exports = authRoute;
