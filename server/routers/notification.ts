import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import { getNotification_post } from "@notifiContr/notificationController";

const router = Router();

router.get("/all", getNotification_post);

export { router as notification };
