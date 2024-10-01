import { Document } from "mongoose";

import { IUser } from "@userMod/types";
export interface ICourse extends Document {
  name: string;
  desc: string;
  tags: string;
  price: number;
  demoUrl: string;
  rating?: number;
  diffLevel: string;
  purchased?: number;
  reviews: ICourReview[];
  courseData: ICourData[];
  estimatedPrice?: number;
  benefits: { title: string }[];
  preRequisites: { title: string }[];
  thumbnail: { publicId: string; url: string };
}

export interface ICourData extends Document {
  desc: string;
  title: string;
  videoUrl: string;
  links: ICourLink[];
  suggestion: string;
  videoLength: number;
  videoPlayer: string;
  videoSection: string;
  questions: ICourQuestion[];
}

export interface ICourLink extends Document {
  url: string;
  title: string;
}

export interface ICourQuestion extends Document {
  user: IUser;
  question: string;
  questionReplies: ICourQuestion[];
}

export interface ICourReview extends ICourQuestion {
  rating: number;
}
