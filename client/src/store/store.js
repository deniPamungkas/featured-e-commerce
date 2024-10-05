import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import productSlice from "./product-slice";
import shopProductSlice from "./shop/product-slice/index";
import productReviewSlice from "./shop/review-slice/index";
import cartSlice from "./shop/cart-slice/index";
import commonSlice from "./common-slice";
import addressSlice from "./shop/address-slice";
import orderSlice from "./shop/order-slice";
import adminOrderSlice from "./order-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,

    product: productSlice,
    shopProduct: shopProductSlice,
    productReview: productReviewSlice,
    shopCart: cartSlice,
    address: addressSlice,

    common: commonSlice,
    order: orderSlice,
    adminOrder: adminOrderSlice,
  },
});

export default store;
