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
    const user = await DatabaseConnection.getInstance().getUserByEmail(
      req.session!.email
    );
    if (!user) {
      throw new UnauthorizedError("User not found");
    }
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

    const user = await DatabaseConnection.getInstance().getUserByEmail(email);
    if (user) throw new BadRequestError("E-mail address already used");

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
