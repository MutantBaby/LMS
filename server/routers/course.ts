import { Router } from "express";

import { courseUpload_post } from "@courContr/courseController";
import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  courseUpload_post
);

export { router as course };
