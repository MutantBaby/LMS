import { JwtPayload } from "jsonwebtoken";

export interface CustomError extends Error {
  statusCode: number;
}

export interface IActivationToken {
  token: string;
  activeCode: string;
}

export interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: string };
}

export interface ActivationTokenPayload extends JwtPayload {
  activeCode: string;
  user: {
    name: string;
    email: string;
    password: string;
  };
}
