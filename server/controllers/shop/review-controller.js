import ProductReviewSchema from "../../models/review.js";
import ProductSchema from "../../models/product.js";

export const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;
    const isProductExist = await ProductSchema.findById(productId);
    if (!isProductExist) {
      return res.status(404).json({
        success: true,
        message: "product is not exist",
      });
    }

    const isReviewed = await ProductReviewSchema.find({ productId, userId });
    if (isReviewed.length) {
      return res.status(409).json({
        success: false,
        message: "you already gave a review on this product",
      });
    }
    const newReview = new ProductReviewSchema({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });
    await newReview.save();

    const productReviews = await ProductReviewSchema.find({ productId });
    const productReviewsLength = productReviews.length;
    const averageReview =
      productReviews.reduce((acc, value) => acc + value.reviewValue, 0) /
      productReviewsLength;

    await ProductSchema.findByIdAndUpdate(productId, { averageReview });

    return res.status(200).json({
      success: true,
      data: newReview,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const productReviews = await ProductReviewSchema.find({
      productId,
    });
    if (!productReviews) {
      return res.status(404).json({
        success: false,
        message: "Product is not reviewed",
      });
    }
    return res.status(200).json({
      success: true,
      data: productReviews,
    });
  } catch (error) {
    console.log(error);
  }
};
