import { JwtPayload } from "jsonwebtoken";

export interface IUserRegistration {
  name: string;
  email: string;
  password: string;
}

export interface ISocialAuth {
  name: string;
  email: string;
  avatar: string;
}

export interface IActivationTokenPayload extends JwtPayload {
  activeCode: string;
  user: IUserRegistration;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IActivationToken {
  token: string;
  activeCode: string;
}
export interface IUpdateUserInfo {
  name: string;
  email: string;
}

export interface IUpdateUserPassword {
  oldPassword: string;
  newPassword: string;
}

export interface IUpdateUserProfile {
  avatar: {
    url: string;
    publicId: string;
  };
}

export interface IUserActivation extends IActivationToken {}
