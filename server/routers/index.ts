import { Router } from "express";

import { user } from "./user";
import { course } from "./course";

const router = Router();

router.use("/user", user);
router.use("/course", course);

export { router as routers };
