import ejs from "ejs";
import path from "path";
import { redis } from "app";
import mongoose, { ObjectId } from "mongoose";
import courseModel from "@courseMod/Course";
import { v2 as cloudinary } from "cloudinary";
import { createCourse } from "@services/coures";
import { Request, Response, NextFunction } from "express";
import { calReviewRating, errorHandler, sendMail } from "@utils";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";
import {
  ICourse,
  ICourData,
  ICourReview,
  ICourQuestion,
} from "@courseMod/types";
import userModel from "@userMod/User";
import notificationModel from "@notifiMod/notification";

export const getNotification_get = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const notifications = await notificationModel.find().sort({ createdAt: -1 });

  res.status(200).json({ notifications, success: true });
});

export const updateNotification_patch = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const notifiId = req.params.id as string;

  const notification = await notificationModel.findById(notifiId);
  if (!notification) return next(errorHandler(404, "Notification Not Found"));

  notification.status = "read";

  await notification.save();

  const notifications = await notificationModel.find().sort({ createdAt: -1 });

  res.status(200).json({ notifications, success: true });
});

export const updateNotification_patch = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const notifiId = req.params.id as string;

  const notification = await notificationModel.findById(notifiId);
  if (!notification) return next(errorHandler(404, "Notification Not Found"));

  notification.status = "read";

  await notification.save();

  const notifications = await notificationModel.find().sort({ createdAt: -1 });

  res.status(200).json({ notifications, success: true });
});