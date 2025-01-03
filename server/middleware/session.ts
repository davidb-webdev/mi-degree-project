import dotenv from "dotenv";
import cookieSession from "cookie-session";
import { Request, Response, NextFunction } from "express";

dotenv.config();

export const session = cookieSession({
  keys: [process.env.COOKIESESSION_SECRET || "1noKeySet1d3jxw81jd9qwidhqw9qwe"],
  maxAge: 1000 * 60 * 60 * 24,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production"
});

export const renewSession = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.session) {
    req.sessionOptions.maxAge = 24 * 60 * 60 * 1000;
  }
  next();
};
