import { Document, ObjectId } from "mongoose";

export interface INotification extends Document {
  title: string;
  status: string;
  message: string;
  userId: ObjectId;
}
