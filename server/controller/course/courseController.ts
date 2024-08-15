import { redis } from "app";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";

import { sendMail, errorHandler } from "@utils";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";
import { createCourse } from "@services/coures";

export const courseUpload_post = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const data = req.body;
  const thumbnail = data.thumbnail;

  try {
    if (thumbnail) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        thumbnail,
        { folder: "course" }
      );

      data.thumbnail = {
        url: secure_url,
        publicId: public_id,
      };
    }

    createCourse(data, res, next);
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
});
