import { AppError } from "./appError";

export class ApiError extends AppError {
    constructor(message: string, statusCode?: number, details?: unknown) {
        super(message, statusCode, 'API error', details);
    }
}