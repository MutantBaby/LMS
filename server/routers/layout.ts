import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import { createLayout_post } from "controller/layout/layoutController";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  createLayout_post
);

export { router as layout };
