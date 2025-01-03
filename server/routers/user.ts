import { Router } from "express";

import {
  userLogin_post,
  userLogout_get,
  getUserInfo_get,
  socialAuth_post,
  getAllUsers_get,
  deleteUser_delete,
  userActivation_post,
  updateUserRole_patch,
  updateUserInfo_patch,
  updateAccessToken_get,
  userRegisteration_post,
  updateUserProfile_patch,
  updateUserPassword_patch,
} from "@userContr/userController";
import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";

const router = Router();

router.get("/me", updateAccessToken_get, authMiddleware, getUserInfo_get);
router.get("/logout", updateAccessToken_get, authMiddleware, userLogout_get);
router.get("/update-accToken", updateAccessToken_get);
router.get(
  "/get-all",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getAllUsers_get
);

router.post("/login", userLogin_post);
router.post("/social-auth", socialAuth_post);
router.post("/activate", userActivation_post);
router.post("/register", userRegisteration_post);

router.patch(
  "/update-info",
  updateAccessToken_get,
  authMiddleware,
  updateUserInfo_patch
);
router.patch(
  "/update-avatar",
  updateAccessToken_get,
  authMiddleware,
  updateUserProfile_patch
);
router.patch(
  "/update-password",
  updateAccessToken_get,
  authMiddleware,
  updateUserPassword_patch
);
router.patch(
  "/update-role",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  updateUserRole_patch
);

router.delete(
  "/delete/:id",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  deleteUser_delete
);

export { router as user };
