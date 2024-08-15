import { NextFunction, Response } from "express";

import { errorHandler } from "@utils";
import courseModel from "@courseMod/Course";

export async function createCourse(
  data: object,
  res: Response,
  next: NextFunction
) {
  try {
    const course = await courseModel.create(data);

    res.status(201).json({ course, success: true });
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
}
