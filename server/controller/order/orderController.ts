import ejs from "ejs";
import path from "path";
import mongoose, { ObjectId } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";

import { redis } from "app";
import { IOrder } from "./orderType";
import userModel from "@userMod/User";
import courseModel from "@courseMod/Course";
import { createCourse } from "@services/coures";
import notificationModel from "@notifiMod/notification";
import { calReviewRating, errorHandler, sendMail } from "@utils";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";
import { createNewOrder } from "@services/order";

export const createOrder = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { courseId, payment_info } = req.body as IOrder;

  const userId = req.user!._id as string;

  try {
    const user = await userModel.findById(userId);

    if (!user) return next(errorHandler(400, "User Not Found"));

    const isCourseExistInUser = user?.courses.find((item) => {
      return item.courseId.toString() === courseId.toString();
    });

    if (isCourseExistInUser)
      return next(errorHandler(400, "Course Already Purchased"));

    const course = await courseModel.findById(courseId);

    if (!course) return next(errorHandler(404, "Course Not Found"));

    const data: any = {
      user: new mongoose.Types.ObjectId(userId as string),
      course: new mongoose.Types.ObjectId(courseId as string),
    };

    const mailData: any = {
      order: {
        _id: course._id?.toString().slice(0, 6),
        name: course!.name,
        price: course!.price,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      },
    };

    const html = await ejs.renderFile(
      path.join(__dirname, "../..", "mail", "order-confirm.ejs"),
      { order: mailData }
    );

    if (user) {
      await sendMail({
        data: mailData,
        email: user.email,
        subject: "Order Confirmation",
        template: "order-confirm.ejs",
      });
    }

    const pushData: any = {
      courseId: new mongoose.Types.ObjectId(course._id as string),
    };

    user?.courses.push(pushData);

    await user?.save();

    await notificationModel.create({
      title: "New Order",
      message: `You have successfully purchased ${course!.name}`,
      user: new mongoose.Types.ObjectId(userId as string),
    });

    createNewOrder(data, res, next);
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
});
