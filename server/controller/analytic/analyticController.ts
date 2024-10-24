import { NextFunction, Request, Response } from "express";

import { errorHandler } from "@utils";
import userModel from "@userMod/User";
import orderModel from "@orderMod/Order";
import courseModel from "@courseMod/Course";
import { genLast12MthDate } from "@utils/analyticsGen";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";

export const getUserAnalytics_get = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const users = await genLast12MthDate(userModel);

  res.status(200).json({ success: true, users });
  try {
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const getCourseAnalytics_get = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const course = await genLast12MthDate(courseModel);

  res.status(200).json({ success: true, course });
  try {
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const getOrderAnalytics_get = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const order = await genLast12MthDate(orderModel);

  res.status(200).json({ success: true, order });
  try {
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});
