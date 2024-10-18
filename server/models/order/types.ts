import { Document, ObjectId } from "mongoose";

export interface IOrder extends Document {
  userId: ObjectId;
  courseId: ObjectId;
  payment_info?: Object;
}
