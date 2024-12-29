import Joi from "joi";
import { ProjectStatuses } from "../models/Project";

export const patchProjectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string()
    .required()
    .valid(...[ProjectStatuses])
});
