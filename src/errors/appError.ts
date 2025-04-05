export class AppError extends Error {
  statusCode: number;
  status?: string;
  details?: unknown;

  constructor(
    message: string,
    statusCode: number,
    status?: string,
    details?: unknown
  ) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
    this.details = details;
  }
}
