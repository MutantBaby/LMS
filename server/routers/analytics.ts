import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import { getUserAnalytics_get } from "@analyticContr/analyticController";

const router = Router();

router.get(
  "/users",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getUserAnalytics_get
);

export { router as analytics };
