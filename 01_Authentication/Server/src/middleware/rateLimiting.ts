import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";

export const createBasicRateLimiter = (
  maxRequests: number,
  timeWindowMs: number
): RateLimitRequestHandler => {
  return rateLimit({
    max: maxRequests,
    windowMs: timeWindowMs,
    message: "Too many requests, please try again later",
    standardHeaders: true,
    legacyHeaders: false,
  });
};