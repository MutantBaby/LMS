import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";

import { errorHandler } from "@utils";
import { ICourse } from "@courseMod/types";
import courseModel from "@courseMod/Course";
import { createCourse } from "@services/coures";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";
import { redis } from "app";

export const courseUpload_post = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = req.body as ICourse;
  const thumbnail = data.thumbnail;

  try {
    if (thumbnail) {
      const result = await cloudinary.uploader.upload(thumbnail.url, {
        folder: "course",
      });

      data.thumbnail = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    createCourse(data, res, next);
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
});

export const courseEdit_patch = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = req.body as ICourse;
  const thumbnail = data.thumbnail;

  try {
    if (thumbnail) {
      await cloudinary.uploader.destroy(thumbnail.publicId);

      const result = await cloudinary.uploader.upload(thumbnail.url, {
        folder: "course",
      });

      data.thumbnail = {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }

    const courseId = req.params.id;
    const course = await courseModel.findByIdAndUpdate(
      courseId,
      { $set: data },
      { new: true }
    );

    res.status(200).json({ course, success: true });
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
});

export const singleCourse_get = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const courseId = req.params.id as string;

  try {
    const isCached = await redis.get(courseId);

    if (isCached)
      return res
        .status(200)
        .json({ course: JSON.parse(isCached), success: true });

    const course = await courseModel
      .findById(courseId)
      .select(
        "-courseData.videoUrl -courseData.links -courseData.suggestion -courseData.questions"
      );

    if (!course) return next(errorHandler(404, "Course not found"));

    await redis.set(courseId, JSON.stringify(course));

    res.status(200).json({ course, success: true });
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
});

export const allCourse_get = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const isCached = await redis.get("allCourses");

    if (isCached)
      return res
        .status(200)
        .json({ course: JSON.parse(isCached), success: true });

    const courses = await courseModel
      .find()
      .select(
        "-courseData.videoUrl -courseData.links -courseData.suggestion -courseData.questions"
      );

    if (!courses) return next(errorHandler(404, "Courses not found"));

    await redis.set("allCourses", JSON.stringify(courses));

    res.status(200).json({ courses, success: true });
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
});

export const courseContentByUser_get = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const courseId = req.params.id as string;
  const userCourselist = req.user?.courses;

  // if user buy course; it will be there
  const isCourseExist = userCourselist?.find(
    (course: any) => course._id === courseId
  );

  if (!isCourseExist) return next(errorHandler(404, "Not Eligible For Course"));

  try {
    const course = await courseModel.findById(courseId);

    if (!course) return next(errorHandler(404, "Error In Fetching Course"));

    const content = course?.courseData;

    res.status(200).json({ content, success: true });
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
});
