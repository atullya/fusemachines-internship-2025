import { NextFunction, Request, Response } from "express";

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role != "admin") {
    return res
      .status(400)
      .json({ success: false, message: "Unauthorized! Only Admin can access" });
  }
  next();
};
