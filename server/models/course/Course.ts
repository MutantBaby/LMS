import mongoose, { Model, Schema } from "mongoose";

import {
  ICourse,
  ICourData,
  ICourLink,
  ICourReview,
  ICourQuestion,
} from "./types";

const linkSchema = new Schema<ICourLink>({
  url: String,
  title: String,
});

const reviewSchema = new Schema<ICourReview>({
  user: Object,
  question: String,
  rating: { type: Number, default: 0 },
});

const questionSchema = new Schema<ICourQuestion>({
  user: Object,
  question: String,
  questionReplies: [Object],
});

const dataSchema = new Schema<ICourData>({
  desc: String,
  videoUrl: String,
  links: [linkSchema],
  suggestion: String,
  videoLength: Number,
  videoPlayer: String,
  videoSection: String,
  questions: [questionSchema],
});

const courseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  tags: { type: String, required: true },
  price: { type: Number, required: true },
  demoUrl: { type: String, required: true },
  rating: { type: Number, default: 0 },
  diffLevel: { type: String, required: true },
  thumbnail: {
    publicId: { type: String },
    url: { type: String },
  },
  purchased: { type: Number, default: 0 },
  reviews: [reviewSchema],
  courseData: [dataSchema],
  estimatedPrice: { type: Number },
  benefits: [{ title: String }],
  preRequisites: [{ title: String }],
});

const courseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
export default courseModel;
