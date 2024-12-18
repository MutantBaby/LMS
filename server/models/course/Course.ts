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
  comment: String,
  commentReplies: [this],
  rating: { type: Number, default: 0 },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const questionSchema = new Schema<ICourQuestion>({
  question: String,
  questionReplies: [this],
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const dataSchema = new Schema<ICourData>({
  desc: String,
  title: String,
  videoUrl: String,
  suggestion: String,
  videoLength: Number,
  links: [linkSchema],
  videoPlayer: String,
  videoSection: String,
  questions: [questionSchema],
});

// desc;
// title;
// videoUrl;
// suggestion;
// videoSection;
// links;

const courseSchema = new Schema<ICourse>(
  {
    estimatedPrice: { type: Number },
    rating: { type: Number, default: 0 },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    tags: { type: String, required: true },
    price: { type: Number, required: true },
    purchased: { type: Number, default: 0 },
    demoUrl: { type: String, required: true },
    diffLevel: { type: String, required: true },
    totalVideos: Number,
    reviews: [reviewSchema],
    courseData: [dataSchema],
    benefits: [{ title: String }],
    preRequisites: [{ title: String }],
    thumbnail: {
      publicId: { type: String },
      url: { type: String },
    },
  },
  { timestamps: true }
);

const courseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
export default courseModel;
