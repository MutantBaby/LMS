import { Document, ObjectId } from "mongoose";

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
  userId: ObjectId;
  question: string;
  questionReplies: ICourQuestion[];
}

export interface ICourReview extends Document {
  userId: ObjectId;
  rating: number;
  comment: string;
  commentReplies?: ICourReview[];
}
