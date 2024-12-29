import DatabaseConnection from "../database/DatabaseConnection";
import { hash, compare } from "bcrypt";
import { TypedRequestBody, TypedResponse } from "../models/Express";
import { BadRequestError, UnauthorizedError } from "../models/Error";
import { NextFunction, Request } from "express";

export const signIn = async (
  req: TypedRequestBody<{ email: string; password: string }>,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await DatabaseConnection.getInstance().getUserByEmail(email);

    if (!(await compare(password, user.password))) {
      throw new BadRequestError("Wrong username or password");
    }

    req.session = {};
    req.session.email = user.email;
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};

export const signOut = async (
  req: Request,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    req.session = null;
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};

export const auth = async (
  req: Request,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    await DatabaseConnection.getInstance().getUserByEmail(req.session!.email);
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};

export const register = async (
  req: TypedRequestBody<{ name: string; email: string; password: string }>,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    await DatabaseConnection.getInstance().verifyUnusedEmail(email);
    const hashedPassword = await hash(password, 10);
    await DatabaseConnection.getInstance().saveUser({
      name,
      email,
      password: hashedPassword
    });

    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};
