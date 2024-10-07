import { Router } from "express";

import { user } from "./user";
import { order } from "./order";
import { course } from "./course";

const router = Router();

router.use("/user", user);
router.use("/order", order);
router.use("/course", course);

export { router as routers };
