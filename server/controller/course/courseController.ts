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
  IAddAnswer,
  IAddReview,
  IAddQuestion,
  IAddReviewReply,
} from "./courseType";
import {
  ICourse,
  ICourData,
  ICourReview,
  ICourQuestion,
} from "@courseMod/types";
import userModel from "@userMod/User";
import notificationModel from "@notifiMod/notification";

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
    (course) => course.courseId.toString() === courseId
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

export const addQuestion_put = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { question, courseId, contentId } = req.body as IAddQuestion;

  try {
    const course = await courseModel.findById(courseId);

    if (!course) return next(errorHandler(404, "Course not found"));

    if (!mongoose.Types.ObjectId.isValid(contentId))
      return next(errorHandler(404, "Invalid Content Id"));

    const courseContent = course.courseData.find(
      (item: ICourData) => item._id!.toString() === contentId
    );

    if (!courseContent) return next(errorHandler(404, "Content not found"));

    const newQuestion: unknown = {
      question,
      questionReplies: [],
      userId: new mongoose.Types.ObjectId(req.user?._id as string),
    };

    courseContent.questions.push(newQuestion as ICourQuestion);

    await notificationModel.create({
      title: "New Question Received",
      message: `You have new question in ${courseContent.title}`,
      userId: new mongoose.Types.ObjectId(req.user?._id as string),
    });

    await course.save();

    res.status(200).json({ course, success: true });
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
});

export const addAnswer_put = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { answer, questionId, courseId, contentId } = req.body as IAddAnswer;

  try {
    const course = await courseModel.findById(courseId);

    if (!course) return next(errorHandler(404, "Course not found"));

    if (!mongoose.Types.ObjectId.isValid(contentId))
      return next(errorHandler(404, "Invalid Content Id"));

    // finding specific video
    const courseContent = course.courseData.find(
      (item: ICourData) => item._id!.toString() === contentId
    );

    if (!courseContent) return next(errorHandler(404, "Content not found"));

    // finding specific question
    const question = courseContent.questions.find(
      (item: ICourQuestion) => item._id!.toString() === questionId
    );

    if (!question) return next(errorHandler(404, "Question not found"));

    const newAnswer: unknown = {
      answer: answer,
      userId: new mongoose.Types.ObjectId(req.user?._id as string),
    };

    question.questionReplies.push(newAnswer as ICourQuestion);

    await course.save();

    if (req.user?._id?.toString() === question.userId?.toString()) {
      await notificationModel.create({
        title: "Reply Received For Your Question",
        message: `You Received new Reply For Your Question in ${courseContent.title}`,
        userId: new mongoose.Types.ObjectId(req.user?._id as string),
      });
    } else {
      const ourUser = await userModel
        .findById(question.userId)
        .select("name email");

      const data = {
        name: ourUser!.name,
        title: courseContent.title,
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../..", "/mail/ques-reply.ejs"),
        data
      );

      try {
        await sendMail({
          data,
          subject: "Question Reply",
          template: "ques-reply.ejs",
          email: ourUser!.email,
        });
      } catch (error: any) {
        return next(errorHandler(500, error.message));
      }
    }

    res.status(200).json({ course, success: true });
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
});

export const addReview_put = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const courseId = req.params.id as string;
  const userCourselist = req.user?.courses;
  const { review, rating } = req.body as IAddReview;

  // if user buy course; it will be there
  const isCourseExist = userCourselist?.find(
    (course: any) => course.courseId.toString() === courseId
  );

  if (!isCourseExist) return next(errorHandler(404, "Not Eligible For Course"));

  try {
    const course = await courseModel.findById(courseId);

    if (!course) return next(errorHandler(404, "Course not found"));

    const reviewData: unknown = {
      rating,
      comment: review,
      userId: new mongoose.Types.ObjectId(req.user?._id as string),
    };

    course.reviews.push(reviewData as ICourReview);

    course.rating = calReviewRating(course);

    await course.save();

    const notification = {
      title: "New Review Recieved",
      message: `${req.user?.name} has given a review in ${course.name}`,
    };

    res.status(200).json({ course, success: true });
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
});

export const addReviewReply_put = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { comment, reviewId, courseId } = req.body as IAddReviewReply;

  try {
    const course = await courseModel.findById(courseId);

    if (!course) return next(errorHandler(404, "Course not found"));

    const review = course.reviews.find(
      (item: ICourReview) => item._id!.toString() === reviewId
    );

    if (!review) return next(errorHandler(404, "Review not found"));

    const newReply: unknown = {
      comment,
      userId: new mongoose.Types.ObjectId(req.user?._id as string),
    };

    if (!review.commentReplies) review.commentReplies = [];

    review.commentReplies.push(newReply as ICourReview);

    await course.save();

    res.status(200).json({ course, success: true });
  } catch (error: any) {
    return next(errorHandler(500, error.message));
  }
});
