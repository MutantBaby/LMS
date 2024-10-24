require("dotenv").config();

import ejs from "ejs";
import path from "path";
import { Secret } from "jsonwebtoken";
import nodeMailer, { Transporter } from "nodemailer";

import { IEmailOptions } from "./types";
import { jwtSign, jwtVerify } from "@jwt";
import { ICourReview, ICourse } from "@courseMod/types";

export function errorHandler(statusCode: number, message: string | any): Error {
  const error = new Error(message);

  error.name = "AppError";
  (error as any).isOperational = true;
  (error as any).statusCode = statusCode;
  (error as any).status = `${statusCode}`.startsWith("4") ? "fail" : "error";

  if (Error.captureStackTrace) Error.captureStackTrace(error, errorHandler);

  return error;
}

export function activationTokenValidator<T>(token: string): T {
  const payload = jwtVerify(token, process.env.JWT_ACTIVATION_SECRET as Secret);

  return payload as T;
}

export function activationTokenGenerator<T, U>(user: T): U {
  const activeCode = Math.floor(1000 + Math.random() * 9999).toString();

  const token = jwtSign(
    { user, activeCode },
    process.env.JWT_ACTIVATION_SECRET as Secret,
    { expiresIn: "10m" }
  );

  return { token, activeCode } as U;
}

const transporter: Transporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  service: process.env.SMTP_SERVICE,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendMail(options: IEmailOptions): Promise<void> {
  const { data, email, subject, template } = options;

  const tempPath = path.join(__dirname, "..", "mail", template);

  const html: string = await ejs.renderFile(tempPath, data);

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}

export function calReviewRating(course: ICourse): number {
  let avg = 0;

  course.reviews.forEach((item: ICourReview) => {
    avg += item.rating;
  });

  return avg / course.reviews.length;
}
