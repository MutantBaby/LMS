import { Router } from "express";

import { user } from "./user";
import { order } from "./order";
import { course } from "./course";
import { notification } from "./notification";

const router = Router();

router.use("/user", user);
router.use("/order", order);
router.use("/course", course);
router.use("/noti", notification);

export { router as routers };
