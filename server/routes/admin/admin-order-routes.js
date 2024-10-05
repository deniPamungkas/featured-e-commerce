import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { getAllOrdersOfAllUsers } from "../../controllers/admin/order-controller.js";

const route = Router();

route.get("/", auth, getAllOrdersOfAllUsers);
// route.get("/:userId", auth, getAllOrdersByUser);
// route.get("/details/:id", auth, getOrderDetails);

export default route;
