import { Request } from "express";

import { IUser } from "@userMod/types";

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
