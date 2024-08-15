import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";

import { errorHandler } from "@utils";
import { ICourse } from "@courseMod/types";
import { createCourse } from "@services/coures";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";
import courseModel from "@courseMod/Course";

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
