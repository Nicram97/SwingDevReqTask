import { ValidationError } from "class-validator";
import { AppError } from "./appError";

export class CustomValidationError extends AppError {
  constructor(message: string, details: ValidationError[]) {
    super(message, 400, "Validation Error", details);
  }
}
