import { NextFunction, Response } from "express";

import { redis } from "app";
import { errorHandler } from "@utils";

export async function getUserById(
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
