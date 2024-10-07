import ejs from "ejs";
import path from "path";
import mongoose, { ObjectId } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";

import { redis } from "app";
import userModel from "@userMod/User";
import { createCourse } from "@services/coures";
import { calReviewRating, errorHandler, sendMail } from "@utils";
import asyncErrorMiddleware from "@middleware/asyncErrorMiddleware";
