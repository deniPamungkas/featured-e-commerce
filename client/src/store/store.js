import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import productSlice from "./product-slice";
import shopProductSlice from "./shop/product-slice/index";
import productReviewSlice from "./shop/review-slice/index";
import cartSlice from "./shop/cart-slice/index";

const store = configureStore({
  reducer: {
    auth: authSlice,

    product: productSlice,
    shopProduct: shopProductSlice,
    productReview: productReviewSlice,
    shopCart: cartSlice,
  },
});

export default store;
