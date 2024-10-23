import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import { getNotification_get } from "@notifiContr/notificationController";

const router = Router();

router.get(
  "/get-notifications",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getNotification_get
);

export { router as notification };
