import Joi from "joi";
import { ProjectStatuses } from "../models/Project";

const projectStatusValues = Object.values(ProjectStatuses);

export const patchProjectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string()
    .valid(...projectStatusValues)
    .required()
});
