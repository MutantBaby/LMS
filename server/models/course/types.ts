import { Document, ObjectId } from "mongoose";

export interface ICourse extends Document {
  name: string;
  desc: string;
  tags: string;
  price: number;
  demoUrl: string;
  rating?: number;
  diffLevel: string;
  purchased: number;
  totalVideos: number;
  reviews: ICourReview[];
  courseData: ICourData[];
  estimatedPrice?: number;
  benefits: { title: string }[];
  categories: { title: string }[];
  preRequisites: { title: string }[];
  thumbnail: { publicId: string; url: string };
}

export interface ICourData extends Document {
  desc: string;
  title: string;
  videoUrl: string;
  links: ICourLink[];
  suggestion: string;
  videoSection: string;
  videoLength?: number;
  videoPlayer?: string;
  questions?: ICourQuestion[];
  videoThumbnail: { publicId: string; url: string };
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
