import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response<AppError>,
  next: NextFunction
) => {
  console.error("Error: ", err.message);

  if (err instanceof AppError) {
    res
      .status(err.statusCode || 500)
      .json(new AppError(err.message, err.statusCode, err.status, err.details));
  } else {
    res
      .status(500)
      .json(
        new AppError(err.message || "Internal Server Error", 500, "App error")
      );
  }
};
