require("dotenv").config();

import { NextFunction, Request, Response } from "express";

import { redis } from "app";
import { jwtVerify } from "@jwt";
import { errorHandler } from "@utils";

export const authorizeRolesMiddleware = function (...roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = req?.user;

    if (!roles.includes(user?.role || ""))
      return next(errorHandler(403, "Not Authorized To Access This Route"));

    next();
  };
};

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken)
    return next(errorHandler(401, "Login First To Access Resourse"));

  console.log("ACCESS ", accessToken);

  const payload: any = jwtVerify(
    accessToken,
    process.env.ACCESS_TOKEN as string
  );

  if (!payload) return next(errorHandler(401, "Unauthorized"));

  const user = await redis.get(payload.id);

  if (!user) return next(errorHandler(401, "User Not Found"));

  req.user = JSON.parse(user);
  next();
}
