import { CookieOptions, Response } from "express";

import { IUser } from "../../models/User";
import { accTokOpt, refTokOpt } from "./types";
import { connectRedis } from "../../database";
import { Redis } from "ioredis";

export const sendToken = async function (user: IUser, res: Response) {
  const accessToken: string = user.signAccessToken();
  const refreshToken: string = user.signRefreshToken();

  const redis: Redis = connectRedis()!;

  // upload sessions to redis
  await redis.set(user._id as string, JSON.stringify(user));

  res.cookie("accessToken", accessToken, accTokOpt as CookieOptions);
  res.cookie("refreshToken", refreshToken, refTokOpt as CookieOptions);

  return accessToken;
};
