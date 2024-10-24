import { Document } from "mongoose";

export interface ICategory extends Document {
  title: string;
}

export interface IFaqItem extends Document {
  answer: string;
  question: string;
}

export interface IBannerImg extends Document {
  url: string;
  publicId: string;
}

export interface ILayout extends Document {
  type: string;
  faq: IFaqItem[];
  categories: ICategory[];
  banner: {
    title: string;
    img: IBannerImg;
    subTitle: string;
  };
}
