import cron from "node-cron";
import { Request, Response, NextFunction } from "express";

import { errorHandler } from "@utils";

import notificationModel from "@notifiMod/notification";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";

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

// delete notification after 30 days
cron.schedule("0 0 0 * * *", async function () {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  await notificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
});
