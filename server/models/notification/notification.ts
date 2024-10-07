import mongoose, { Schema } from "mongoose";
import { INotification } from "./types";

const notificationSchema: Schema<INotification> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true, default: "unread" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const notificationModel = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default notificationModel;
