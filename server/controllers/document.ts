import DatabaseConnection from "../database/DatabaseConnection";
import {
  TypedRequest,
  TypedRequestBody,
  TypedRequestParams,
  TypedResponse
} from "../models/Express";
import { NextFunction } from "express";
import { ObjectId } from "mongodb";
import { WithId } from "../models/Mongodb";
import { generateDocument } from "../functions/docx";

export const postDocument = async (
  req: TypedRequestParams<{ projectId: string; language: "sv" | "en" }>,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    const documentResponse = generateDocument();
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};
