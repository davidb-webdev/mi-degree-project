import Joi from "joi";

export const patchFloorSchema = Joi.object({
  title: Joi.string().required(),
  floorPlanPath: Joi.string().required()
});

export const postFloorSchema = Joi.object({
  title: Joi.string().required(),
  projectId: Joi.string().required()
});
