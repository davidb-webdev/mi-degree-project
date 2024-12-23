import { Request, NextFunction } from "express";
import { TypedResponse } from "../models/Express";

export const errorHandler = (
  error: Error & { statusCode?: number },
  req: Request,
  res: TypedResponse<{ error: string }>,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    error: message
  });
};
