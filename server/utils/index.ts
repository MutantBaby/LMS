require("dotenv").config();

import ejs from "ejs";
import path from "path";
import jsonWebToken, { Secret } from "jsonwebtoken";
import nodeMailer, { Transporter } from "nodemailer";

import {
  CustomError,
  EmailOptions,
  IActivationToken,
  ActivationTokenPayload,
} from "./types";

export function errorHandler(
  statusCode: number,
  message: string | any
): CustomError {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;

  Error.captureStackTrace(error, errorHandler);

  return error;
}

export async function activationTokenValidator<
  T extends ActivationTokenPayload
>(token: string): Promise<T> {
  const payload = (await jsonWebToken.verify(
    token,
    process.env.JWT_ACTIVATION_SECRET as Secret,
    {}
  )) as T;

  return payload;
}

export async function activationTokenGenerator<T>(
  user: T
): Promise<IActivationToken> {
  const activeCode = Math.floor(1000 + Math.random() * 9999).toString();

  const token = await jsonWebToken.sign(
    { user, activeCode },
    process.env.JWT_ACTIVATION_SECRET as Secret,
    { expiresIn: "10m" }
  );

  return { token, activeCode };
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

export async function sendMail(options: EmailOptions): Promise<void> {
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
