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

export interface IActivationRes {
  message: string;
}

export interface IActivationReq {
  token: string;
  activeCode: string;
}

export interface ILoginRes {
  user: string;
  accessToken: string;
}

export interface ILoginReq {
  email: string;
  password: string;
}

export interface IRefreshTokenRes {
  accessToken: string;
}

export interface IRefreshTokenReq {}

export interface ILoadUserRes {
  user: string;
  accessToken: string;
}

export interface ILoadUserReq {}
