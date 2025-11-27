import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../models/Error.js";
import { Schema } from "joi";

const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      next(
        new BadRequestError(
          `Validation error: ${error.details.map((detail) => detail.message)}`
        )
      );
      return;
    }

    next();
  };
};

export default validate;
