import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import { createOrder } from "@orderContr/orderController";

const router = Router();

router.post("/create", authMiddleware, createOrder);

export { router as order };
