import { NextFunction, Response } from "express";

import { redis } from "app";
import { errorHandler } from "@utils";
import userModel from "@userMod/User";

export async function getUserByIdService(
  id: string,
  res: Response,
  next: NextFunction
) {
  try {
    const userJson = await redis.get(id);

    if (!userJson)
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });

    const user = JSON.parse(userJson);

    res.status(200).json({ user, success: true });
  } catch (error: any) {
    next(errorHandler(500, error.message));
  }
}

export async function getAllUsersService(res: Response) {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(200).json({ users, success: true });
}
