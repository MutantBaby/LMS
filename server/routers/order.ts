import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import { createOrder, getAllOrders_get } from "@orderContr/orderController";

const router = Router();

router.post("/create", authMiddleware, createOrder);
router.get(
  "/get-all",
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getAllOrders_get
);

export { router as order };
