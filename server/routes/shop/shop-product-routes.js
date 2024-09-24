import { Router } from "express";
import { getFilteredProducts } from "../../controllers/shop/product-constroller.js";

const route = Router();

route.get("/products/get", getFilteredProducts);

export default route;
