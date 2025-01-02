import Joi from "joi";

export const postDocumentSchema = Joi.object({
  projectId: Joi.string().required(),
  language: Joi.string().valid("en", "sv").required()
});
