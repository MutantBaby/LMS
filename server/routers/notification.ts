import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import {
  getNotification_get,
  updateNotification_patch,
} from "@notifiContr/notificationController";
import { updateAccessToken_get } from "@userContr/userController";

const router = Router();

router.get(
  "/get-notifications",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getNotification_get
);

router.patch(
  "/update-notification/:id",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  updateNotification_patch
);

export { router as notification };
