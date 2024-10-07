import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  name: string;
  role: string;
  email: string;
  password: string;
  isverified: boolean;
  isSocialLogin: boolean;
  signAccessToken: () => string;
  signRefreshToken: () => string;
  courses: Array<{ courseId: ObjectId }>;
  compPassword: (password: string) => Promise<boolean>;
  avatar: {
    url: string;
    publicId: string;
  };
}
