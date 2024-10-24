import { NextFunction, Request, Response } from "express";

import { errorHandler } from "@utils";
import userModel from "@userMod/User";
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
