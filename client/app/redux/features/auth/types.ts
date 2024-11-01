export interface IInitialState {
  user: string;
  token: string;
}

export interface IRegistrationRes {
  token: string;
  message: string;
}

export interface IRegistrationReq {
  name: string;
  email: string;
  password: string;
}
