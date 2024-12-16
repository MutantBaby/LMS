import { Router } from "express";

import authMiddleware, {
  authorizeRolesMiddleware,
} from "@middleware/authMiddleware";
import { createOrder, getAllOrders_get } from "@orderContr/orderController";
import { updateAccessToken_get } from "@userContr/userController";

const router = Router();

router.post("/create", updateAccessToken_get, authMiddleware, createOrder);
router.get(
  "/get-all",
  updateAccessToken_get,
  authMiddleware,
  authorizeRolesMiddleware("admin"),
  getAllOrders_get
);

export { router as order };
