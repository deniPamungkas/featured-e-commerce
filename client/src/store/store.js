import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import productSlice from "./product-slice";
import shopProductSlice from "./shop/product-slice/index";

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    shopProduct: shopProductSlice,
  },
});

export default store;
