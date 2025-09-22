const rateLimit = require("express-rate-limit");

// Factory function to create a rate limiter
// maxRequests = how many requests are allowed
// time = time window in milliseconds (e.g. 15 * 60 * 1000 = 15 minutes)
const createBasicRateLimiter = (maxRequests, time) => {
  return rateLimit({
    // Maximum number of requests allowed in the given window
    max: maxRequests,

    // Time window in milliseconds (e.g. 1 minute, 15 minutes, etc.)
    windowMs: time,

    // Message sent back when limit is exceeded
    message: "Too many requests, please try again later",

    // Send rate limit info in modern standard headers (RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset)
    standardHeaders: true,

    // Disable old legacy headers (X-RateLimit-Limit, X-RateLimit-Remaining, etc.)
    legacyHeaders: false,
  });
};

module.exports = { createBasicRateLimiter };
