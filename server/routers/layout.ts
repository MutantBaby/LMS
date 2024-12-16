import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import {
  editLayout_put,
  createLayout_post,
  getLayoutByType_get,
} from "@layoutContr/layoutController";
import { updateAccessToken_get } from "@userContr/userController";

const router = Router();

router.get(
  "/get",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getLayoutByType_get
);
router.post(
  "/create",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  createLayout_post
);
router.put(
  "/edit",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  editLayout_put
);

export { router as layout };
