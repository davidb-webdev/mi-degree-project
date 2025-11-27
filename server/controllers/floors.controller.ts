import DatabaseConnection from "../database/DatabaseConnection.js";
import {
  TypedRequest,
  TypedRequestBody,
  TypedRequestParams,
  TypedResponse
} from "../models/Express.js";
import { NextFunction } from "express";
import { ObjectId } from "mongodb";
import { WithId } from "../models/Mongodb.js";
import { Floor } from "../models/Floor.js";
import { BadRequestError } from "../models/Error.js";

export const getFloors = async (
  req: TypedRequestParams<{ projectId: string }>,
  res: TypedResponse<WithId<Floor>[]>,
  next: NextFunction
) => {
  try {
    const floors = await DatabaseConnection.getInstance().getFloorsByProjectId(
      new ObjectId(req.params.projectId)
    );
    res.json(floors);
  } catch (error: unknown) {
    next(error);
  }
};

export const getFloor = async (
  req: TypedRequestParams<{ id: string }>,
  res: TypedResponse<WithId<Floor>>,
  next: NextFunction
) => {
  try {
    const floor = await DatabaseConnection.getInstance().getFloorById(
      new ObjectId(req.params.id)
    );
    res.json(floor);
  } catch (error: unknown) {
    next(error);
  }
};

export const postFloor = async (
  req: TypedRequestBody<{ title: string; projectId: string }>,
  res: TypedResponse<{ id: string }>,
  next: NextFunction
) => {
  try {
    const floor: Floor = {
      title: req.body.title,
      projectId: new ObjectId(req.body.projectId),
      floorPlanPath: "",
      createdAt: new Date(),
      editedAt: new Date()
    };
    const floorId = await DatabaseConnection.getInstance().createFloor(floor);
    res.json({ id: floorId.toString() });
  } catch (error: unknown) {
    next(error);
  }
};

export const patchFloor = async (
  req: TypedRequest<
    { id: string },
    {
      title: string;
      floorPlanPath: string;
    }
  >,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    const { title, floorPlanPath } = req.body;
    const floor = {
      title,
      floorPlanPath,
      editedAt: new Date()
    };
    await DatabaseConnection.getInstance().updateFloor(req.params.id, floor);
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteFloor = async (
  req: TypedRequestParams<{ id: string }>,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    await DatabaseConnection.getInstance().deleteFloor(
      new ObjectId(req.params.id)
    );
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};

export const postFloorPlan = async (
  req: TypedRequestParams<{ id: string }>,
  res: TypedResponse<{ success: true; floorPlanPath: string }>,
  next: NextFunction
) => {
  try {
    if (!req.file) throw new BadRequestError("No file uploaded");

    const floor = {
      floorPlanPath: req.file.path,
      editedAt: new Date()
    };
    await DatabaseConnection.getInstance().updateFloor(req.params.id, floor);

    res.json({
      success: true,
      floorPlanPath: req.file.path
    });
  } catch (error: unknown) {
    next(error);
  }
};
