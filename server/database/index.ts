require("dotenv").config();

import Redis from "ioredis";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

export function connectMongodb() {
  if (!process.env.MONGODB_URL) return console.log("No MongoDB URL");

  mongoose.connect(process.env.MONGODB_URL);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });
}

export function connectRedis(): Redis | void {
  if (!process.env.REDIS_URL) return console.log("No Redis URL");

  return new Redis(process.env.REDIS_URL);
}

export function connectCloudinary() {
  if (
    !process.env.CLOUD_NAME &&
    !process.env.CLOUD_API_KEY &&
    !process.env.CLOUD_SECRET_KEY
  )
    return console.log("No Cloudinary URL");

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
  });

  console.log("Connected to Cloudinary");
}
