import { IActivationToken } from "./../../utils/types";

export interface IUserRegistration {
  name: string;
  email: string;
  password: string;
}

export interface IUserActivation extends IActivationToken {}
