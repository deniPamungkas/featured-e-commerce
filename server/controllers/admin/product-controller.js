import { imageUpload } from "../../helper/cloudinary.js";
import ProductSchema from "../../models/product.js";

export const handleUploadImage = async (req, res) => {
  try {
    const fileBuffer = Buffer.from(req.file?.buffer);
    const result = await imageUpload(fileBuffer);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
  }
};

export const addNewProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    } = req.body;

    const newProduct = new ProductSchema({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      averageReview,
    });

    const addedProduct = await newProduct.save();
    return res.status(200).json({
      success: true,
      mesaage: "success to add new product",
      data: addedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      mesaage: "failed to add new product, please try again",
      error: error,
    });
  }
};
