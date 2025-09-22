const logger = require("../config/logger");

// This middleware logs details about every request that comes to your server
const requestLogger = (req, res, next) => {
  //   const timeStamp = new Date().toISOString(); // When the request happened
  //   const method = req.method; // What type of request (GET, POST, etc.)
  //   const url = req.url; // Which route/endpoint was called
  //   const userAgent = req.get("User-Agent"); // What browser/app made the request

  //   // Prints info like: [2024-03-15T10:30:45.123Z] GET /api/users - Mozilla/5.0...
  //   console.log(`[${timeStamp}]  ${method} ${url} -${userAgent}`);
  logger.info(`${req.method} ${req.originalUrl}`);
  next(); // Continue to the next middleware or route
};

// This middleware adds a timestamp to every request
const addTimeStamp = (req, res, next) => {
  req.timeStamp = new Date().toISOString(); // Adds current time to the request object
  next(); // Continue to the next middleware or route
};

module.exports = { requestLogger, addTimeStamp };
