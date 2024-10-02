import ejs from "ejs";
import path from "path";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";

import { redis } from "app";
import { calReviewRating, errorHandler, sendMail } from "@utils";
import courseModel from "@courseMod/Course";
import { createCourse } from "@services/coures";
import { IAddAnswer, IAddQuestion, IAddReview } from "./courseType";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";
import {
  ICourData,
  ICourse,
  ICourQuestion,
  ICourReview,
} from "@courseMod/types";
import { course } from "@routers/course";
import { IUser } from "@userMod/types";

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
      user: req.user,
      question: question,
      questionReplies: [],
    };

    courseContent.questions.push(newQuestion as ICourQuestion);

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

    const courseContent = course.courseData.find(
      (item: ICourData) => item._id!.toString() === contentId
    );

    if (!courseContent) return next(errorHandler(404, "Content not found"));

    const question = courseContent.questions.find(
      (item: ICourQuestion) => item._id!.toString() === questionId
    );

    if (!question) return next(errorHandler(404, "Question not found"));

    const newAnswer: any = {
      answer,
      user: req.user,
    };

    question.questionReplies.push(newAnswer);

    await course.save();

    if (req.user?._id === question.user._id) {
      // send notification
    } else {
      const data = {
        name: question.user.name,
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
          email: question.user.email,
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
    (course: any) => course._id!.toString() === courseId
  );

  if (!isCourseExist) return next(errorHandler(404, "Not Eligible For Course"));

  try {
    const course = await courseModel.findById(courseId);

    if (!course) return next(errorHandler(404, "Course not found"));

    const reviewData: unknown = {
      user: req.user,
      rating,
      comment: review,
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
  
});