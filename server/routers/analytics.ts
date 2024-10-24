import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import {
  getCourseAnalytics_get,
  getOrderAnalytics_get,
  getUserAnalytics_get,
} from "@analyticContr/analyticController";

const router = Router();

router.get(
  "/users",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getUserAnalytics_get
);
router.get(
  "/courses",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getCourseAnalytics_get
);
router.get(
  "/orders",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getOrderAnalytics_get
);

export { router as analytics };
