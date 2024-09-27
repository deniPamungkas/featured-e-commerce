import mongoose, { Schema } from "mongoose";

const FeaturedImageSchema = new Schema(
  {
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("FeatureImage", FeaturedImageSchema);
