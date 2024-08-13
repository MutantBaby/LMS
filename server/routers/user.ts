import { Router } from "express";

import {
  userLogin_post,
  userLogout_get,
  userActivation_post,
  userRegisteration_post,
} from "../controller/user/userController";

const router = Router();

router.get("/logout", userLogout_get);
router.post("/login", userLogin_post);
router.post("/activate", userActivation_post);
router.post("/register", userRegisteration_post);

export default router;
