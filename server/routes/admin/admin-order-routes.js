import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import {
  getAllOrdersOfAllUsers,
  getOrderDetailsForAdmin,
  updateOrderStatus,
} from "../../controllers/admin/order-controller.js";

const route = Router();

route.get("/", auth, getAllOrdersOfAllUsers);
route.patch("/details/update/:id", auth, updateOrderStatus);
route.get("/details/:id", auth, getOrderDetailsForAdmin);

export default route;
