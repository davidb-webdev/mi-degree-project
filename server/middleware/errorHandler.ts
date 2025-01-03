import { Request, Response, NextFunction } from "express";
import { TypedResponse } from "../models/Express";

const errorHandler = (
  error: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    message,
    statusCode
  });
};

export default errorHandler;
