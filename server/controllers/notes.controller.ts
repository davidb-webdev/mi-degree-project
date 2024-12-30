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
import { Note, NoteCategories, NoteCategory } from "../models/Note";

export const getNotes = async (
  req: TypedRequestParams<{ floorId: string }>,
  res: TypedResponse<WithId<Note>[]>,
  next: NextFunction
) => {
  try {
    const notes = await DatabaseConnection.getInstance().getNotesByFloorId(
      new ObjectId(req.params.floorId)
    );
    res.json(notes);
  } catch (error: unknown) {
    next(error);
  }
};

export const getNote = async (
  req: TypedRequestParams<{ id: string }>,
  res: TypedResponse<WithId<Note>>,
  next: NextFunction
) => {
  try {
    const note = await DatabaseConnection.getInstance().getNoteById(
      new ObjectId(req.params.id)
    );
    res.json(note);
  } catch (error: unknown) {
    next(error);
  }
};

export const postNote = async (
  req: TypedRequestBody<{ title: string; floorId: string }>,
  res: TypedResponse<{ id: string }>,
  next: NextFunction
) => {
  try {
    const note: Note = {
      title: req.body.title,
      description: "",
      category: NoteCategories.BlockedEscapeRoute,
      floorId: new ObjectId(req.body.floorId),
      xCoordinate: 0,
      yCoordinate: 0,
      createdAt: new Date(),
      editedAt: new Date()
    };
    const noteId = await DatabaseConnection.getInstance().createNote(note);
    res.json({ id: noteId.toString() });
  } catch (error: unknown) {
    next(error);
  }
};

export const patchNote = async (
  req: TypedRequest<
    { id: string },
    {
      title: string;
      description: string;
      category: NoteCategory;
      xCoordinate: number;
      yCoordinate: number;
    }
  >,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    const { title, description, category, xCoordinate, yCoordinate } =
      req.body;
    const note = {
      title,
      description,
      category,
      xCoordinate,
      yCoordinate,
      editedAt: new Date()
    };
    await DatabaseConnection.getInstance().updateNote(req.params.id, note);
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};

export const deleteNote = async (
  req: TypedRequestParams<{ id: string }>,
  res: TypedResponse<{ success: boolean }>,
  next: NextFunction
) => {
  try {
    await DatabaseConnection.getInstance().deleteNote(
      new ObjectId(req.params.id)
    );
    res.json({ success: true });
  } catch (error: unknown) {
    next(error);
  }
};
