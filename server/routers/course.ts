import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import {
  allCourse_get,
  addAnswer_put,
  addQuestion_put,
  courseEdit_patch,
  singleCourse_get,
  courseUpload_post,
  courseContentByUser_get,
} from "@courContr/courseController";

const router = Router();

router.get("/all", allCourse_get);
router.get("/single/:id", singleCourse_get);
router.get("/content/:id", authMiddleware, courseContentByUser_get);

router.put("/add-answer", authMiddleware, addAnswer_put);
router.put("/add-question", authMiddleware, addQuestion_put);

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
