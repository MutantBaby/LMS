require("dotenv").config();

import bcrypt from "bcryptjs";
import jsonWebToken, { Secret } from "jsonwebtoken";
import mongoose, { Document, Model, Schema } from "mongoose";

const emailRegexPattren = /^[^\s@]+@[^\s@].[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  role: string;
  email: string;
  password: string;
  isverified: boolean;
  signAccessToken: () => string;
  signRefreshToken: () => string;
  courses: Array<{ courseId: string }>;
  compPassword: (password: string) => Promise<boolean>;
  avatar: {
    url: string;
    publicId: string;
  };
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
    },
    role: {
      type: String,
      default: "user",
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please Enter Email"],
      validate: {
        validator: function (v: string) {
          return emailRegexPattren.test(v);
        },
        message: (props) => `${props.value} Not Valid`,
      },
    },
    password: {
      type: String,
      select: false,
      required: [true, "Please Enter Password"],
      minlength: [6, "Must be 6 Characters Long"],
    },
    isverified: {
      type: Boolean,
      default: false,
    },
    courses: [{ courseId: String }],
    avatar: {
      url: String,
      publicId: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.compPassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.signAccessToken = function (): string {
  return jsonWebToken.sign(
    { id: this._id },
    process.env.ACCESS_TOKEN as Secret,
    { expiresIn: "10m" }
  );
};

userSchema.methods.signRefreshToken = function (): string {
  return jsonWebToken.sign(
    { id: this._id },
    process.env.REFRESH_TOKEN as Secret,
    { expiresIn: "3d" }
  );
};

const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default userModel;
