import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import {
  getCourseAnalytics_get,
  getOrderAnalytics_get,
  getUserAnalytics_get,
} from "@analyticContr/analyticController";
import { updateAccessToken_get } from "@userContr/userController";

const router = Router();

router.get(
  "/users",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getUserAnalytics_get
);
router.get(
  "/courses",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getCourseAnalytics_get
);
router.get(
  "/orders",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getOrderAnalytics_get
);

export { router as analytics };
