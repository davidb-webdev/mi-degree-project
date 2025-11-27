import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../models/Error.js";

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.email) {
    throw new UnauthorizedError("You are not signed in");
  }
  next();
};

export default requireAuth;
