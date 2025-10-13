// logger.js
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info", // can be 'error', 'warn', 'info', 'http', 'debug'
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()}: ${message}`
    )
  ),
  transports: [
    new transports.Console(), // log to console
    new transports.File({ filename: "logs/error.log", level: "error" }), // errors only
    new transports.File({ filename: "logs/combined.log" }), // all logs
  ],
});

module.exports = logger;
