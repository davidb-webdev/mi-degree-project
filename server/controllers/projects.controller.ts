import DatabaseConnection from "../database/DatabaseConnection";
import {
  TypedRequest,
  TypedRequestBody,
  TypedRequestParams,
  TypedResponse
} from "../models/Express";
import { NextFunction, Request } from "express";
import { Project, ProjectStatus, ProjectStatuses } from "../models/Project";
import { ObjectId } from "mongodb";
import { WithId } from "../models/Mongodb";

export const getProjects = async (
  req: Request,
  res: TypedResponse<WithId<Project>[]>,
  next: NextFunction
) => {
  try {
    const user = await DatabaseConnection.getInstance().getUserByEmail(
      req.session!.email
    );
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
  res: TypedResponse<WithId<Project>>,
  next: NextFunction
) => {
  try {
    const project = await DatabaseConnection.getInstance().getProjectById(
      new ObjectId(req.params.id)
    );
    res.json(project);
  } catch (error: unknown) {
    next(error);
  }
};

export const postProject = async (
  req: TypedRequestBody<{ title: string }>,
  res: TypedResponse<{ id: string }>,
  next: NextFunction
) => {
  try {
    const user = await DatabaseConnection.getInstance().getUserByEmail(
      req.session!.email
    );

    const project: Project = {
      title: req.body.title,
      description: "",
      status: ProjectStatuses.Draft,
      owner: user._id,
      createdAt: new Date(),
      editedAt: new Date()
    };
    const projectId = await DatabaseConnection.getInstance().createProject(
      project
    );
    res.json({ id: projectId.toString() });
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
    }
  >,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    const user = await DatabaseConnection.getInstance().getUserByEmail(
      req.session!.email
    );

    const { title, description, status } = req.body;
    const project = {
      title,
      description,
      status,
      editedAt: new Date()
    };
    await DatabaseConnection.getInstance().updateProject(
      req.params.id,
      project
    );
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
    await DatabaseConnection.getInstance().deleteProject(
      new ObjectId(req.params.id)
    );
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};
