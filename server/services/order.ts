import { NextFunction, Response } from "express";

import { errorHandler } from "@utils";
import orderModel from "@orderMod/Order";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";

export const createNewOrder = asyncErrorMiddleware(async function (
  data: any,
  res: Response,
  next: NextFunction
) {
  try {
    const newOrder = await orderModel.create(data);
    next(newOrder);
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
});
