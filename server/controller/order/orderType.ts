import { ObjectId } from "mongoose";

export interface IOrder {
  courseId: string;
  payment_info: string;
}
