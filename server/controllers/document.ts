import DatabaseConnection from "../database/DatabaseConnection";
import {
  TypedRequest,
  TypedRequestBody,
  TypedRequestParams,
  TypedResponse
} from "../models/Express";
import { NextFunction } from "express";
import { generateDocument } from "../functions/docx";

export const postDocument = async (
  req: TypedRequestParams<{ projectId: string; language: string }>,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    const { projectId, language } = req.body;
    const documentResponse = await generateDocument(projectId, language);
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};
