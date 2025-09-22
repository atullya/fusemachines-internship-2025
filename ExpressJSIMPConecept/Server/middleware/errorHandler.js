const logger = require("../config/logger");

// Creates custom errors that include HTTP status codes
class APIError extends Error {
  constructor(message, statusCode) {
    super(message); // The error message (like "User not found")
    this.name = "APIError"; // Label for this type of error
    this.statusCode = statusCode; // HTTP code (like 404 for not found)
  }
}

// Automatically catches errors in async routes
const asyncHandler = (func) => (req, res, next) => {
  return Promise.resolve(func(req, res, next)).catch(next); // If error happens, pass to error handler
};

// Handles ALL errors in your app
const globalErrorHandler = (err, req, res, next) => {
  //   console.error(err.stack); // Shows error details in terminal

  // from here for winston logger
  // const statusCode = err.statusCode || 500;
  // const message = err.message || "Something went wrong!";

  // // Winston logs the structured error
  // logger.error(
  //   `${req.method} ${req.originalUrl} - ${statusCode} - ${message}\n${err.stack}`
  // );
  logger.error(err.stack);
  //upto here
  // Check if it's our custom error
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message, // Send the custom error message
    });
  } else if (err.name === "validationError") {
    return res.status(400).json({
      status: "error",
      message: "validation Error",
    });
  } else {
    // For any other error, send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};
module.exports = { APIError, asyncHandler, globalErrorHandler };

/*
he Problem (Why we need it):
When you use async/await in Express routes, errors don't get caught automatically:

JavaScript

// ❌ WITHOUT asyncHandler - This will CRASH your app!
app.get('/users', async (req, res) => {
  const users = await User.find(); // If database fails, app crashes!
  res.json(users);
});
The Solution:
JavaScript

// ✅ WITH asyncHandler - Errors are caught!
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find(); // If database fails, error is handled
  res.json(users);
}));
Let's break down the weird syntax:
JavaScript

const asyncHandler = (func) => (req, res, next) => {
  return Promise.resolve(func(req, res, next)).catch(next);
};
Step by step:

First part: (func) =>

Takes your async function as input
Second part: (req, res, next) =>

Returns a new function that Express can use
Inside part: Promise.resolve(func(req, res, next)).catch(next)

Runs your function
If error happens, .catch(next) sends it to error handler
*/
