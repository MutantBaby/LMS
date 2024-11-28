export interface IInitialState {
  user: Object;
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
  user: Object;
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
  user: Object;
  accessToken: string;
}

export interface ILoadUserReq {}

export interface ILogoutRes {
  message: string;
}

export interface ILogoutReq {}

export interface ISocialAuthRes {
  user: Object;
  accessToken: string;
}

export interface ISocialAuthReq {
  name: string;
  email: string;
  avatar: string;
}

export interface IUpdateAvatarReq {
  avatar: string;
}

export interface IUpdateAvatarRes {
  user: Object;
}
