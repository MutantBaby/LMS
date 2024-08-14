import ejs from "ejs";
import path from "path";
import { redis } from "app";
import { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction, CookieOptions } from "express";

import {
  sendMail,
  errorHandler,
  activationTokenGenerator,
  activationTokenValidator,
} from "@utils";
import {
  IUserLogin,
  IUserActivation,
  IActivationToken,
  IUserRegistration,
  IActivationTokenPayload,
} from "./userType";
import userModel, { IUser } from "@models/User";
import { accTokOpt, refTokOpt } from "@jwt/types";
import { jwtSign, jwtVerify, sendToken } from "@jwt";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";

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

    const { token, activeCode } = activationTokenGenerator<
      IUserRegistration,
      IActivationToken
    >(userObj);

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
    const payload = activationTokenValidator<IActivationTokenPayload>(token);

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
  const { user } = req;

  await redis.del(user?._id as string);

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(200).json({ success: true, message: "Logout Success" });
});

export const updateAccessToken_get = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const refreshToken: string = req.cookies.refreshToken;

  const payload: any = jwtVerify(
    refreshToken,
    process.env.REFRESH_TOKEN as Secret
  );

  if (!payload) return next(errorHandler(400, "Invalid Refresh Token"));

  try {
    const session = await redis.get(payload.id);

    if (!session) return next(errorHandler(400, "Invalid Refresh Token"));

    const user: IUser = JSON.parse(session);

    const accessToken = jwtSign(
      { id: user._id },
      process.env.ACCESS_TOKEN as Secret,
      {
        expiresIn: "10m",
      }
    );

    const refreshToken = jwtSign(
      { id: user._id },
      process.env.REFRESH_TOKEN as Secret,
      {
        expiresIn: "3d",
      }
    );

    res.cookie("accessToken", accessToken, accTokOpt as CookieOptions);

    res.cookie("refreshToken", refreshToken, refTokOpt as CookieOptions);

    res.status(200).json({ accessToken, success: true });
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});
