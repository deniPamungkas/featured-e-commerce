import { Router } from "express";
import {
  addProductReview,
  getProductReview,
} from "../../controllers/shop/review-controller.js";
import { auth } from "../../middlewares/auth.js";

const route = Router();

route.post("/", auth, addProductReview);
route.get("/:productId", getProductReview);

export default route;
