import { Router } from "express";

import { user } from "./user";
import { order } from "./order";
import { course } from "./course";
import { analytics } from "./analytics";
import { notification } from "./notification";

const router = Router();

router.use("/user", user);
router.use("/order", order);
router.use("/course", course);
router.use("/noti", notification);
router.use("/analytics", analytics);

export { router as routers };
