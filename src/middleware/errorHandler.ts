import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error: ", err.message);

  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    details: err.details,
  } as AppError);
};
