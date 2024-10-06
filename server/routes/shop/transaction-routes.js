import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import {
  createTransaction,
  getTransactionByUserId,
} from "../../controllers/shop/transaction-controller.js";

const route = Router();

route.post("/", auth, createTransaction);
route.get("/:userId", auth, getTransactionByUserId);
// route.get("/details/:id", auth, getOrderDetails);

export default route;
