import DatabaseConnection from "../database/DatabaseConnection";
import {
  TypedRequestBody,
  TypedResponse
} from "../models/Express";
import { NextFunction } from "express";
import { generateDocument } from "../functions/docx";

export const postDocument = async (
  req: TypedRequestBody<{ projectId: string; language: "en" | "sv" }>,
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
