import { CookieOptions, Response } from "express";
import jsonWebToken, { Secret, SignOptions, VerifyOptions } from "jsonwebtoken";

import { redis } from "app";
import { IUser } from "@userMod/types";
import { accTokOpt, refTokOpt } from "./types";

export const sendToken = async function (user: IUser, res: Response) {
  const accessToken: string = user.signAccessToken();
  const refreshToken: string = user.signRefreshToken();

  // upload sessions to redis
  await redis.set(user._id as string, JSON.stringify(user));

  res.cookie("accessToken", accessToken, accTokOpt as CookieOptions);
  res.cookie("refreshToken", refreshToken, refTokOpt as CookieOptions);

  return accessToken;
};

export const jwtVerify = function <T>(
  token: string,
  secret: Secret,
  option?: VerifyOptions
) {
  if (option) return jsonWebToken.verify(token, secret, option) as T;

  return jsonWebToken.verify(token, secret) as T;
};

export const jwtSign = function <T>(
  payload: string | Buffer | object,
  secret: Secret,
  option?: SignOptions
) {
  if (option) return jsonWebToken.sign(payload, secret, option) as T;

  return jsonWebToken.sign(payload, secret) as T;
};
