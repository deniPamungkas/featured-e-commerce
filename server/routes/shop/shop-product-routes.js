import { Router } from "express";
import {
  getFilteredProducts,
  getProductDetails,
} from "../../controllers/shop/product-constroller.js";

const route = Router();

route.get("/products/get", getFilteredProducts);
route.get("/product/get/:id", getProductDetails);

export default route;
