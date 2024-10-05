import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createTransaction } from "../../controllers/shop/transaction-controller.js";

const route = Router();

route.post("/", auth, createTransaction);
// route.get("/:userId", auth, getAllOrdersByUser);
// route.get("/details/:id", auth, getOrderDetails);

export default route;
