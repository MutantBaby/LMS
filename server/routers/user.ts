import { Router } from "express";

import {
  userLogin_post,
  userLogout_get,
  getUserInfo_get,
  socialAuth_post,
  userActivation_post,
  updateUserInfo_patch,
  updateAccessToken_get,
  userRegisteration_post,
  updateUserProfile_patch,
  updateUserPassword_patch,
  getAllUsers_get,
} from "@userContr/userController";
import authMiddleware, { authorizeRolesMiddleware } from "@middleware/authMiddleware";

const router = Router();

router.get("/id", authMiddleware, getUserInfo_get);
router.get("/logout", authMiddleware, userLogout_get);
router.get("/update-accToken", updateAccessToken_get);
router.get(
  "/all-users",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getAllUsers_get
);


router.post("/login", userLogin_post);
router.post("/social-auth", socialAuth_post);
router.post("/activate", userActivation_post);
router.post("/register", userRegisteration_post);

router.patch("/update-info", authMiddleware, updateUserInfo_patch);
router.patch("/update-avatar", authMiddleware, updateUserProfile_patch);
router.patch("/update-password", authMiddleware, updateUserPassword_patch);

export { router as user };
