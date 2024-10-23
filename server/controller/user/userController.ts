import ejs from "ejs";
import path from "path";
import { redis } from "app";
import { Secret } from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction, CookieOptions } from "express";

import userModel from "@userMod/User";
import { IUser } from "@userMod/types";
import { accTokOpt, refTokOpt } from "@jwt/types";
import { jwtSign, jwtVerify, sendToken } from "@jwt";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";
import {
  getUserByIdService,
  getAllUsersService,
  updateUserRoleService,
} from "@services/user";
import {
  sendMail,
  errorHandler,
  activationTokenGenerator,
  activationTokenValidator,
} from "@utils";
import {
  IUserLogin,
  ISocialAuth,
  IUserActivation,
  IUpdateUserInfo,
  IActivationToken,
  IUserRegistration,
  IUpdateUserProfile,
  IUpdateUserPassword,
  IActivationTokenPayload,
} from "./userType";

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
  const userId = req.user?._id as string;

  await redis.del(userId);

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
      { expiresIn: "100m" }
    );

    const refreshToken = jwtSign(
      { id: user._id },
      process.env.REFRESH_TOKEN as Secret,
      { expiresIn: "5d" }
    );

    res.cookie("accessToken", accessToken, accTokOpt as CookieOptions);

    res.cookie("refreshToken", refreshToken, refTokOpt as CookieOptions);

    res.status(200).json({ accessToken, success: true });
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const getUserInfo_get = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!._id as string;

  await getUserByIdService(userId, res, next);
});

export const socialAuth_post = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, email, avatar } = req.body as ISocialAuth;

  try {
    const user = (await userModel.findOne({ email: email })) as IUser;

    if (!user) {
      const newUser = await userModel.create({
        name,
        email,
        avatar,
        isSocialLogin: true,
      });
      const accessToken = await sendToken(newUser, res);

      return res
        .status(200)
        .json({ user: newUser, accessToken, success: true });
    }

    const accessToken = await sendToken(user, res);

    res.status(200).json({ user, accessToken, success: true });
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const updateUserInfo_patch = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  // user get from session.
  // get name & gmail to update.

  const userId = req.user!._id as string;

  const { name, email } = req.body as IUpdateUserInfo;

  try {
    const sessionUser = await userModel.findById(userId);

    if (!sessionUser) return next(errorHandler(404, "No User Found"));

    if (email) {
      if (sessionUser.email !== email) {
        const newUser = await userModel.findOne({ email });

        if (newUser) return next(errorHandler(400, "User Already Exist"));
        sessionUser.email = email;
      }
    }

    if (name) sessionUser.name = name;

    await sessionUser?.save();
    await redis.set(userId, JSON.stringify(sessionUser));

    res.status(200).json({ user: sessionUser, success: true });
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const updateUserPassword_patch = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { oldPassword, newPassword } = req.body as IUpdateUserPassword;

  if (!oldPassword || !newPassword)
    return next(errorHandler(400, "Enter old & new Passwords"));

  try {
    const user = (await userModel
      .findOne({ _id: req.user!._id })
      .select("+password")) as IUser;

    const isMatch = await user.compPassword(oldPassword);

    if (!isMatch) return next(errorHandler(400, "Invalid Password"));

    user.password = newPassword;

    await user.save();

    await redis.set(user._id as string, JSON.stringify(user));

    res.status(200).json({ user, success: true });
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const updateUserProfile_patch = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!._id as string;

  const { avatar } = req.body as IUpdateUserProfile;

  if (!avatar) return next(errorHandler(400, "No Profile Info Provided"));

  try {
    const user = await userModel.findOne({ _id: userId });

    if (!user) return next(errorHandler(404, "No User Found"));

    if (user.avatar.publicId)
      await cloudinary.uploader.destroy(user.avatar.publicId);

    const result = await cloudinary.uploader.upload(avatar.url, {
      folder: "avatars",
      width: 150,
    });

    user.avatar = {
      url: result.secure_url,
      publicId: result.public_id,
    };

    await user.save();
    await redis.set(userId, JSON.stringify(user));

    res.status(200).json({ user, success: true });
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const getAllUsers_get = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await getAllUsersService(res);
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const updateUserRole_patch = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, role } = req.body as { id: string; role: string };

  try {
    await updateUserRoleService(id, role, res);
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const deleteUser_delete = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.id as string;

  try {
    await userModel.findByIdAndDelete(userId);
    await redis.del(userId);

    res.status(200).json({ success: true, message: "User Deleted" });
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});
