import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { CustomValidationError } from "../errors/validationError";

export const queryParamsValidator = <T extends object>(type: new () => T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const queryParams = plainToInstance(type, req.query);
    const errors = await validate(queryParams);

    if (errors.length > 0) {
      next(
        new CustomValidationError(
          "Validation of query parameters has failed",
          errors
        )
      );
    } else {
      next();
    }
  };
};
