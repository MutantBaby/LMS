import { Router } from "express";

import {
  userLogin_post,
  userLogout_get,
  userActivation_post,
  userRegisteration_post,
  updateAccessToken_get,
} from "@userContr/userController";
import authMiddleware from "@middleware/authMiddleware";

const router = Router();

router.post("/login", userLogin_post);
router.post("/activate", userActivation_post);
router.get("/refresh", updateAccessToken_get);
router.post("/register", userRegisteration_post);
router.get("/logout", authMiddleware, userLogout_get);

export { router as user };
