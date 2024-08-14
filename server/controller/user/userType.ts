import { JwtPayload } from "jsonwebtoken";

export interface IUserRegistration {
  name: string;
  email: string;
  password: string;
}

export interface IUserActivation extends IActivationToken {}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IActivationTokenPayload extends JwtPayload {
  activeCode: string;
  user: IUserRegistration;
}

export interface IActivationToken {
  token: string;
  activeCode: string;
}
