import { Document, ObjectId } from "mongoose";

export interface IOrder extends Document {
  user: ObjectId;
  course: ObjectId;
  payment_info?: Object;
}
