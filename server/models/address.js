import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema(
  {
    userId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Addresses", AddressSchema);
