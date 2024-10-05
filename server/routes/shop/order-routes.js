import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import {
  capturePayment,
  createOrder,
  failedPayment,
  getAllOrdersByUser,
  getOrderDetails,
  trxNotif,
} from "../../controllers/shop/order-controller.js";

const route = Router();

route.post("/", createOrder);
route.get("/capturePayment", auth, capturePayment);
route.get("/failedPayment", auth, failedPayment);
route.get("/:userId", auth, getAllOrdersByUser);
route.get("/details/:id", auth, getOrderDetails);
route.post("/midtrans/response-status", trxNotif);

export default route;
