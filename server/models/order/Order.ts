import mongoose, { Schema } from "mongoose";
import { IOrder } from "./types";

const orderSchema: Schema<IOrder> = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    payment_info: { type: Object },
  },
  { timestamps: true }
);

const orderModel = mongoose.model<IOrder>("Order", orderSchema);

export default orderModel;
