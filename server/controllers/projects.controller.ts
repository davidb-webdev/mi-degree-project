import DatabaseConnection from "../database/DatabaseConnection";
import { TypedRequestBody, TypedResponse } from "../models/Express";
import { BadRequestError, UnauthorizedError } from "../models/Error";
import { NextFunction, Request } from "express";
import { Project } from "../models/Project";

export const getProjects = async (
  req: Request,
  res: TypedResponse<Project[]>,
  next: NextFunction
) => {
  try {
    if (!req.session || !req.session.email) {
      throw new UnauthorizedError("You are not signed in");
    }
    const user = await DatabaseConnection.getInstance().getUserByEmail(
      req.session.email
    );
    if (!user) {
      throw new UnauthorizedError("User not found");
    }
    const projects = await DatabaseConnection.getInstance().getProjectsByUserId(
			user._id
    );
    res.json(projects);
  } catch (error: unknown) {
    next(error);
  }
};

export const getProject = async (
  req: TypedRequestBody<{ email: string; password: string }>,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};

export const postProject = async (
  req: TypedRequestBody<{ email: string; password: string }>,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};

export const patchProject = async (
  req: TypedRequestBody<{ email: string; password: string }>,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteProject = async (
  req: TypedRequestBody<{ email: string; password: string }>,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};
