import { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";
  declare global {
      namespace Express {
        interface Request {
          timeStamp?: string | Date; 
        }
      }
    }
export const requestLogger=(req:Request,res:Response,next:NextFunction)=>{
   logger.info(`${req.method} ${req.originalUrl}`);
  next();
}

export const addTimeStamp = (req: Request, res: Response, next: NextFunction): void => {
  req.timeStamp = new Date().toISOString();
  next();
};