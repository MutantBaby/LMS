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

  console.log("type", type);

  if (!type) return next(errorHandler(400, "Please provide a layout type"));

  try {
    const isTypeExist = await layoutModel.findOne({ type });

    if (isTypeExist)
      return next(errorHandler(400, `Type ${type} Already Exist`));

    if (type === "Banner") {
      console.log("inside");
      const { banner } = req.body;

      console.log("banner", banner);
      const myCloud = await cloudinary.v2.uploader.upload(banner.img, {
        folder: "layout",
      });

      const newBanner: IBanner = {
        type: "Banner",
        banner: {
          title: banner.title,
          subTitle: banner.subTitle,
          img: {
            url: myCloud.secure_url,
            publicId: myCloud.public_id,
          },
        },
      };

      await layoutModel.create(newBanner);
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
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const editLayout_put = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const type = req.body.type as string;

  if (!type) return next(errorHandler(400, "Please provide a layout type"));

  try {
    if (type === "Banner") {
      const bannerData = await layoutModel.findOne({ type: "Banner" });

      if (bannerData)
        await cloudinary.v2.uploader.destroy(bannerData.banner.img.publicId);

      const { title, img, subTitle } = req.body;

      const myCloud = await cloudinary.v2.uploader.upload(img, {
        folder: "layout",
      });

      const banner: IBanner = {
        type: "Banner",
        banner: {
          img: {
            url: myCloud.secure_url,
            publicId: myCloud.public_id,
          },
          title,
          subTitle,
        },
      };

      await layoutModel.findByIdAndUpdate(bannerData?._id, { banner });
    }

    if (type === "Categories") {
      const categoriesData = await layoutModel.findOne({ type: "Categories" });

      const { categories } = req.body;
      await layoutModel.findByIdAndUpdate(categoriesData?._id, { categories });
    }

    if (type === "Faq") {
      const faqData = await layoutModel.findOne({ type: "Faq" });

      const { faq } = req.body;
      await layoutModel.findByIdAndUpdate(faqData?._id, { faq });
    }

    res.status(201).json({ success: true, message: "Layout Updated" });
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});

export const getLayoutByType_get = asyncErrorMiddleware(async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { type } = req.params;

  try {
    const layout = await layoutModel.findOne({ type });

    res.status(200).json({ success: true, layout });
  } catch (error: any) {
    return next(errorHandler(400, error.message));
  }
});
