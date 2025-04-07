import { AppError } from "./appError";

export class TimeoutError extends AppError {
  constructor(message: string) {
    super(message, 408, "Timeout error");
  }
}
