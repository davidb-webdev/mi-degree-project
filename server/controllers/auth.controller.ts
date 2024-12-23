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

    if (!user || !user.password || !(await compare(password, user.password))) {
      throw new BadRequestError("Wrong username or password");
    }

    req.session = {};
    req.session.id = user._id;
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
    if (!req.session?.id) throw new UnauthorizedError("You are not signed in");
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};

export const register = async (
  req: TypedRequestBody<{ name: string; email: string; password: string }>,
  res: TypedResponse<{ userId: string }>,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const user = await DatabaseConnection.getInstance().getUserByEmail(email);
    if (user) throw new BadRequestError("E-mail address already used");

    const hashedPassword = await hash(password, 10);
    const userId = await DatabaseConnection.getInstance().saveUser({
      name,
      email,
      password: hashedPassword
    });

    res.json({ userId: userId.toString() });
  } catch (error: unknown) {
    next(error);
  }
};
