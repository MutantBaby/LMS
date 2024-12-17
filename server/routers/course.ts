import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import {
  allCourse_get,
  addAnswer_put,
  addReview_put,
  addQuestion_put,
  courseEdit_patch,
  singleCourse_get,
  courseUpload_post,
  getAllCourses_get,
  addReviewReply_put,
  deleteCourse_delete,
  generateVideoUrl_post,
  courseContentByUser_get,
} from "@courContr/courseController";
import { updateAccessToken_get } from "@userContr/userController";

const router = Router();

router.get("/all", allCourse_get);
router.get("/single/:id", singleCourse_get);
router.get(
  "/content/:id",
  updateAccessToken_get,
  authMiddleware,
  courseContentByUser_get
);
router.get(
  "/get-all",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getAllCourses_get
);

router.put("/add-answer", updateAccessToken_get, authMiddleware, addAnswer_put);
router.put(
  "/add-question",
  updateAccessToken_get,
  authMiddleware,
  addQuestion_put
);

router.put(
  "/add-review/:id",
  updateAccessToken_get,
  authMiddleware,
  addReview_put
);
router.put(
  "/add-reply",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  addReviewReply_put
);

router.post(
  "/create",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  courseUpload_post
);

router.post("/cipher-otp", generateVideoUrl_post);

router.patch(
  "/edit/:id",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  courseEdit_patch
);

router.delete(
  "/delete/:id",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  deleteCourse_delete
);

export { router as course };
