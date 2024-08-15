import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import {
  courseEdit_patch,
  courseUpload_post,
} from "@courContr/courseController";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  courseUpload_post
);
router.patch(
  "/edit/:id",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  courseEdit_patch
);

export { router as course };
