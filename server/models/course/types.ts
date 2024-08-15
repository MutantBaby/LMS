import { Document } from "mongoose";

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
  videoUrl: string;
  links: ICourLink[];
  suggestion: string;
  videoLength: number;
  videoPlayer: string;
  videoSection: string;
  questions: ICourComment[];
}

export interface ICourLink extends Document {
  url: string;
  title: string;
}

export interface ICourComment extends Document {
  user: object;
  comment: string;
  commentReplies: ICourComment[];
}

export interface ICourReview extends ICourComment {
  rating: number;
}
