const { APIError } = require("./errorHandler");

// Middleware that checks if the API version in the URL is correct
const urlVersioning = (version) => (req, res, next) => {
  // Check if the URL starts with the correct version (like /api/v1)
  if (req.path.startsWith(`/api/${version}`)) {
    next(); // Version is correct, continue to the route
  } else {
    throw new APIError("API Version is not supported", 404);
  }
};
module.exports = { urlVersioning };
