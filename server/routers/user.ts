import { Router } from "express";

import {
  userActivation_post,
  userRegisteration_post,
} from "../controller/user/userController";

const router = Router();

router.post("/register-user", userRegisteration_post);
router.post("/activate-user", userActivation_post);

export default router;
