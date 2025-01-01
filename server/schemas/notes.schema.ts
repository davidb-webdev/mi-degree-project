import Joi from "joi";
import { NoteCategories } from "../models/Note";

const noteCategoryValues = Object.values(NoteCategories);

export const patchNoteSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string()
    .valid(...noteCategoryValues)
    .required(),
  xCoordinate: Joi.number().required(),
  yCoordinate: Joi.number().required()
});

export const postNoteSchema = Joi.object({
  title: Joi.string().required(),
  floorId: Joi.string().required()
});
