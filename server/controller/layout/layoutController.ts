import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from "express";

import { errorHandler } from "@utils";
import { IBanner } from "./layoutType";
import layoutModel from "@layoutMod/Layout";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";

export const createLayout_post = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const type = req.body.type as string;

  if (!type) return next(errorHandler(400, "Please provide a layout type"));

  const isTypeExist = await layoutModel.findOne({ type });

  if (isTypeExist) return next(errorHandler(400, `Type ${type} Already Exist`));

  if (type === "Banner") {
    const { title, img, subTitle } = req.body;

    const myCloud = await cloudinary.v2.uploader.upload(img, {
      folder: "layout",
    });

    const banner: IBanner = {
      img: {
        url: myCloud.secure_url,
        publicId: myCloud.public_id,
      },
      title,
      subTitle,
    };

    await layoutModel.create({ type, banner });
  }

  if (type === "Categories") {
    const { categories } = req.body;
    await layoutModel.create({ type, categories });
  }

  if (type === "Faq") {
    const { faq } = req.body;
    await layoutModel.create({ type, faq });
  }

  res.status(201).json({ success: true, message: "Layout Created" });
});
