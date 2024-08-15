import mongoose, { Model, Schema } from "mongoose";

import {
  ICourse,
  ICourData,
  ICourLink,
  ICourReview,
  ICourComment,
} from "./types";

const linkSchema = new Schema<ICourLink>({
  url: String,
  title: String,
});

const reviewSchema = new Schema<ICourReview>({
  user: Object,
  comment: String,
  rating: { type: Number, default: 0 },
});

const commentSchema = new Schema<ICourComment>({
  user: Object,
  comment: String,
  commentReplies: [Object],
});

const dataSchema = new Schema<ICourData>({
  desc: String,
  videoUrl: String,
  links: [linkSchema],
  suggestion: String,
  videoLength: Number,
  videoPlayer: String,
  videoSection: String,
  questions: [commentSchema],
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
