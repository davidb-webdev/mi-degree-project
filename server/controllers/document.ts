import DatabaseConnection from "../database/DatabaseConnection.js";
import { TypedRequestBody, TypedResponse } from "../models/Express.js";
import { NextFunction } from "express";
import { generateDocument } from "../functions/docx.js";

export const postDocument = async (
  req: TypedRequestBody<{ projectId: string; language: "en" | "sv" }>,
  res: TypedResponse<{ documentPath: string }>,
  next: NextFunction
) => {
  try {
    const { projectId, language } = req.body;
    const documentPath = await generateDocument(projectId, language);
    res.json({ documentPath });
  } catch (error: unknown) {
    next(error);
  }
};
