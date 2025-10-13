import { Request, Response, NextFunction } from "express";
import { defineAbilitiesFor } from "../config/abilities";


export const authorize = (action: string, subject: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Get the rules for the logged-in user
    const ability = defineAbilitiesFor(req.user);

    // 2. Check if they are allowed to do the action
    if (ability.can(action, subject)) {
      // Yes, they can. Let them proceed.
      next();
    } else {
      // No, they can't. Block them.
      return res.status(403).json({
        // 403 means "Forbidden"
        success: false,
        message: "You are not authorized to perform this action.",
      });
    }
  };
};
