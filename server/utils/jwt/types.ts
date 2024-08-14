require("dotenv").config();

export interface ITokenOptions {
  maxAge: number;
  expiresIn: Date;
  secure?: boolean;
  httpOnly: boolean;
  sameSite: "lazy" | "strict" | "none" | undefined;
}

const accTokExp = parseInt(process.env.ACCESS_TOKEN_EXPIRES as string);
const refTokExp = parseInt(process.env.REFRESH_TOKEN_EXPIRES as string);

export const accTokOpt: ITokenOptions = {
  secure: true,
  httpOnly: false,
  sameSite: "none",
  maxAge: (accTokExp * 60 * 60 * 1000) as number,
  expiresIn: new Date(Date.now() + accTokExp * 60 * 60 * 1000),
};

export const refTokOpt: ITokenOptions = {
  secure: true,
  httpOnly: false,
  sameSite: "none",
  maxAge: (refTokExp * 24 * 60 * 60 * 1000) as number,
  expiresIn: new Date(Date.now() + refTokExp * 24 * 60 * 60 * 1000),
};
