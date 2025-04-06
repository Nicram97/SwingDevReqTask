export class AppError extends Error {
  msg: string;
  statusCode?: number;
  status?: string;
  details?: unknown;

  constructor(
    message: string,
    statusCode?: number,
    status?: string,
    details?: unknown
  ) {
    super(message);
    this.msg = message;
    this.statusCode = statusCode;
    this.status = status;
    this.details = details;
  }
}
