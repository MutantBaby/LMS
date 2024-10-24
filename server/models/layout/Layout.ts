import mongoose, { Schema } from "mongoose";
import { IBannerImg, ICategory, IFaqItem, ILayout } from "./types";

const categorySchema: Schema<ICategory> = new mongoose.Schema({
  title: { type: String },
});

const faqSchema: Schema<IFaqItem> = new mongoose.Schema({
  question: { type: String },
  answer: { type: String },
});

const bannerImgSchema: Schema<IBannerImg> = new mongoose.Schema({
  url: { type: String },
  publicId: { type: String },
});

const layoutSchema: Schema<ILayout> = new mongoose.Schema({
  type: { type: String },
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    img: bannerImgSchema,
    title: { type: String },
    subTitle: { type: String },
  },
});

const layoutModel = mongoose.model<ILayout>("Layout", layoutSchema);

export default layoutModel;
