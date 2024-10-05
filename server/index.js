import express from "express";
import { dbconnect } from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoute from "./routes/auth/auth-routes.js";
import uploadRoute from "./routes/admin/upload-image-route.js";
import adminOrderRoute from "./routes/admin/admin-order-routes.js";
import shopProductRoute from "./routes/shop/shop-product-routes.js";
import productReviewRoute from "./routes/shop/product-review-routes.js";
import cartRoute from "./routes/shop/cart-routes.js";
import featureRoute from "./routes/common/feature-image-routes.js";
import addressRoute from "./routes/shop/address-routes.js";
import orderRoute from "./routes/shop/order-routes.js";
import transactionRoute from "./routes/shop/transaction-routes.js";
import "./config/passport.js";

const app = express();

dbconnect();

app.use(
  cors({
    origin: ["https://featured-e-commerce.vercel.app", "http://localhost:5173"],
    methods: ["GET", "CREATE", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/admin/product", uploadRoute);
app.use("/admin/order", adminOrderRoute);
app.use("/shop", shopProductRoute);
app.use("/review", productReviewRoute);
app.use("/cart", cartRoute);
app.use("/feature", featureRoute);
app.use("/address", addressRoute);
app.use("/order", orderRoute);
app.use("/transaction", transactionRoute);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
