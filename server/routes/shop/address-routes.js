import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAllAddress,
} from "../../controllers/shop/address-controller.js";

const route = Router();

route.post("/", auth, addAddress);
route.get("/:userId", auth, fetchAllAddress);
route.delete("/:userId/:addressId", auth, deleteAddress);
route.put("/:userId/:addressId", auth, editAddress);

export default route;
