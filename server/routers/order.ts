import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";

const router = Router();

export { router as order };
