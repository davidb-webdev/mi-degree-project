import DatabaseConnection from "../database/DatabaseConnection";
import { hash, compare } from "bcrypt";
import { TypedRequestBody, TypedResponse } from "../models/Express";
import { BadRequestError, UnauthorizedError } from "../models/Error";
import { Request } from "express";
import { ObjectId } from "mongodb";

export const signIn = async (
  req: TypedRequestBody<{ email: string; password: string }>,
  res: TypedResponse<{ success: boolean } | Error>
) => {
  try {
    const { email, password } = req.body;
    const user = await DatabaseConnection.getInstance().getUserByEmail(email);

    if (!user || !user.password || !(await compare(password, user.password))) {
      throw new BadRequestError("Wrong username or password");
    }

    req.session = {};
    req.session.id = user._id;
    res.status(200).json({ success: true });
  } catch (error: unknown) {
    res
      .status(error instanceof BadRequestError ? 400 : 500)
      .json(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
  }
};

export const signOut = async (
  req: Request,
  res: TypedResponse<{ success: boolean } | Error>
) => {
  try {
    req.session = null;
    res.status(200).json({ success: true });
  } catch (error: unknown) {
    res
      .status(error instanceof BadRequestError ? 400 : 500)
      .json(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
  }
};

export const authorize = async (
  req: Request,
  res: TypedResponse<{ success: boolean } | Error>
) => {
  try {
    if (!req.session?.id) throw new UnauthorizedError("You are not signed in"); // TODO: test "?"
    res.status(200).json({ success: true });
  } catch (error: unknown) {
    res
      .status(error instanceof UnauthorizedError ? 401 : 500)
      .json(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
  }
};

export const registerUser = async (
  req: TypedRequestBody<{ name: string; email: string; password: string }>,
  res: TypedResponse<{ userId: ObjectId } | Error>
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

    res.status(200).json({ userId });
  } catch (error: unknown) {
    res
      .status(error instanceof BadRequestError ? 400 : 500)
      .json(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
  }
};

export const testDb = async (
  req: Request,
  res: TypedResponse<{ userId: ObjectId } | Error>
) => {
  try {
    const user = await DatabaseConnection.getInstance().getUserByEmail(
      "abc@example.com"
    );

    res.status(200).json({ userId: user!._id });
  } catch (error: unknown) {
    res
      .status(error instanceof BadRequestError ? 400 : 500)
      .json(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
  }
};
