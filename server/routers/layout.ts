import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import {
  editLayout_put,
  createLayout_post,
  getLayoutByType_get,
} from "@layoutContr/layoutController";

const router = Router();

router.get(
  "/get",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getLayoutByType_get
);
router.post(
  "/create",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  createLayout_post
);
router.put(
  "/edit",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  editLayout_put
);

export { router as layout };
