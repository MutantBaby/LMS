import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils";

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = errorHandler(400, message);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue).join(", ")} entered`;
    err = errorHandler(400, message);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((value: any) => value.message)
      .join(", ");
    err = errorHandler(400, message);
  }

  if (err.name === "JsonWebTokenError") {
    const message = "Invalid token. Please login again";
    err = errorHandler(400, message);
  }

  if (err.name === "TokenExpiredError") {
    const message = "Token expired. Please login again";
    err = errorHandler(400, message);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}
