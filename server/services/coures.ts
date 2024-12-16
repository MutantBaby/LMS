import { NextFunction, Response } from "express";

import { errorHandler } from "@utils";
import courseModel from "@courseMod/Course";

export async function createCourse(
  data: object,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("Inside 3");
    const course = await courseModel.create(data);

    res.status(201).json({ course, success: true });
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
}

export async function getAllCoursesService(res: Response) {
  const courses = await courseModel.find().sort({ createdAt: -1 });

  res.status(200).json({ courses, success: true });
}
