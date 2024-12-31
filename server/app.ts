require("dotenv").config();

import cors from "cors";
import express from "express";
import { Redis } from "ioredis";
import { promisify } from "util";
import cookieParser from "cookie-parser";

import { routers } from "@routers";
import { connectCloudinary, connectRedis } from "@database";
import syncErrorMiddleware from "@middleware/syncErrorMiddleware";

connectCloudinary();
export const app = express();
export const redis: Redis = connectRedis()!;

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(cors({ origin: process.env.ORIGIN, credentials: true }));

app.use(routers);

app.use(syncErrorMiddleware);
