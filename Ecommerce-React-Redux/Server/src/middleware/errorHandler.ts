import { Request,Response,NextFunction } from "express";
import { logger } from "../config/logger";

export class APIError extends Error{
   public statusCode: number;
     constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError";
  }
}
export const asyncHandler =
  (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };

  export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  logger.error(
    `${req.method} ${req.originalUrl} - ${err.statusCode || 500} - ${
      err.message
    }\n${err.stack}`
  );

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: "Validation error",
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};