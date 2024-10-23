import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import {
  getNotification_get,
  updateNotification_patch,
} from "@notifiContr/notificationController";

const router = Router();

router.get(
  "/get-notifications",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getNotification_get
);

router.patch(
  "/update-notification/:id",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  updateNotification_patch
);

export { router as notification };
