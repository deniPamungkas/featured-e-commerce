import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import {
  addTocart,
  deleteCartItem,
  fetchCartItems,
  updateCartItemQty,
} from "../../controllers/shop/cart-controller.js";

const route = Router();

route.post("/", auth, addTocart);
route.get("/:userId", auth, fetchCartItems);
route.delete("/:userId/:productId", auth, deleteCartItem);
route.put("/update-cart", auth, updateCartItemQty);

export default route;
