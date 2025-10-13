import { Request, Response, NextFunction } from "express";
import { APIError } from "./errorHandler"; 


export const urlVersioning =
  (version: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (req.path.startsWith(`/api/${version}`)) {
      next(); 
    } else {
   
      throw new APIError("API Version is not supported", 404);
    }
  };