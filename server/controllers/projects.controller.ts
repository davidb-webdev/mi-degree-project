import DatabaseConnection from "../database/DatabaseConnection";
import {
  TypedRequest,
  TypedRequestBody,
  TypedRequestParams,
  TypedResponse
} from "../models/Express";
import { BadRequestError, UnauthorizedError } from "../models/Error";
import { NextFunction, Request } from "express";
import { Project, ProjectStatus } from "../models/Project";
import { ObjectId } from "mongodb";

export const getProjects = async (
  req: Request,
  res: TypedResponse<Project[]>,
  next: NextFunction
) => {
  try {
    const user = await DatabaseConnection.getInstance().getUserByEmail(
      req.session!.email
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
  req: TypedRequestParams<{ id: string }>,
  res: TypedResponse<Project>,
  next: NextFunction
) => {
  try {
    const project = await DatabaseConnection.getInstance().getProjectById(
      new ObjectId(req.params.id)
    );
    if (!project) throw new BadRequestError("Project not found");
    res.json(project);
  } catch (error: unknown) {
    next(error);
  }
};

export const postProject = async (
  req: TypedRequestBody<{
    title: string;
    description: string;
    status: ProjectStatus;
    owner: string;
  }>,
  res: TypedResponse<{ id: string }>,
  next: NextFunction
) => {
  try {
  } catch (error: unknown) {
    next(error);
  }
};

export const patchProject = async (
  req: TypedRequest<
    { id: string },
    {
      title: string;
      description: string;
      status: ProjectStatus;
      owner: string;
    }
  >,
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
  req: TypedRequestParams<{ id: string }>,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};
