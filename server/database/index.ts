require("dotenv").config();

import Redis from "ioredis";
import mongoose from "mongoose";

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
