import ejs from "ejs";
import path from "path";
import { Request, Response, NextFunction } from "express";

import userModel from "../../models/User";
import { IUserActivation, IUserLogin, IUserRegistration } from "./userType";
import asyncErrorMiddleware from "../../middleware/asyncErrorMiddleware";
import {
  sendMail,
  errorHandler,
  activationTokenValidator,
  activationTokenGenerator,
} from "../../utils";
import { sendToken } from "../../utils/jwt";

export const userRegisteration_post = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, password } = req.body;

  try {
    const alreadyExist = await userModel.findOne({ email });

    if (alreadyExist) return next(errorHandler(400, "User Already Exist"));

    const userObj = { name, email, password };

    const { token, activeCode } =
      await activationTokenGenerator<IUserRegistration>(userObj);

    const data = { name, activeCode };

    const html = await ejs.renderFile(
      path.join(__dirname, "../..", "mail", "activation.ejs"),
      data
    );

    await sendMail({
      data,
      email,
      template: "activation.ejs",
      subject: "Account Activation",
    });

    res.status(200).json({
      token,
      success: true,
      message: `Check Mail: ${email} To Activate Account`,
    });
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const userActivation_post = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { token, activeCode } = req.body as IUserActivation;

  try {
    const payload = await activationTokenValidator(token);

    if (payload.activeCode !== activeCode)
      return next(errorHandler(400, "Invalid Activation Code"));

    const { name, email, password } = payload.user;

    const alreadyExist = await userModel.findOne({ email });

    if (alreadyExist) return next(errorHandler(400, "User Already Exist"));

    const user = await userModel.create({ name, email, password });

    res.status(201).json({ success: true, message: "User Created" });
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const userLogin_post = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body as IUserLogin;

  if (!email || !password)
    return next(errorHandler(400, "Enter Email & Password"));

  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) return next(errorHandler(400, "User Not Found"));

    const isMatch = await user.compPassword(password);

    if (!isMatch) return next(errorHandler(400, "Invalid Password"));

    const accessToken = await sendToken(user, res);

    res.status(200).json({
      user,
      accessToken,
      success: true,
    });
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const userLogout_get = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  const accTok = req.cookies.accessToken;
  const refTok = req.cookies.refreshToken;

  if (!accTok || !refTok) console.log("Cookies Cleared");

  res.status(200).json({ success: true, message: "Logout Success" });
});
