import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: String,
    cartId: String,
    cartItems: [
      {
        id: String,
        name: String,
        url: String,
        price: Number,
        quantity: Number,
        merchant_name: String,
        brand: String,
        category: String,
      },
    ],
    addressInfo: {
      addressId: String,
      address: String,
      city: String,
      pincode: String,
      phone: String,
      notes: String,
    },
    customer_details: {
      first_name: String,
      last_name: String,
      email: String,
      phone: String,
    },
    orderDate: Date,
    orderStatus: String,
    paymentStatus: String,
    totalAmount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Orders", OrderSchema);
