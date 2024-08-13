import { Router } from "express";

import {
  userLogin_post,
  userLogout_get,
  userActivation_post,
  userRegisteration_post,
} from "@userContr/userController";
import authMiddleware from "@middleware/authMiddleware";

const router = Router();

router.post("/login", userLogin_post);
router.post("/activate", userActivation_post);
router.post("/register", userRegisteration_post);
router.get("/logout", authMiddleware, userLogout_get);

export { router as user };
