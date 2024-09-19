import { imageDelete, imageUpload } from "../../helper/cloudinary.js";
import ProductSchema from "../../models/product.js";

export const handleUploadImage = async (req, res) => {
  try {
    const fileBuffer = Buffer.from(req.file?.buffer);
    const data = await imageUpload(fileBuffer);
    return res.status(200).json({ success: true, data });
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

export const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await ProductSchema.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
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
    const findProduct = await ProductSchema.findByIdAndUpdate(id);
    if (findProduct) {
      findProduct.title = title;
      findProduct.description = description;
      findProduct.category = category;
      findProduct.brand = brand;
      findProduct.price = price;
      findProduct.salePrice = salePrice;
      findProduct.totalStock = totalStock;
      findProduct.image = image;
      findProduct.averageReview = averageReview;

      const editedMenu = await findProduct.save();
      return res
        .status(200)
        .json({ message: "Product updated!", data: editedMenu });
    }
    if (!findProduct) {
      return res
        .status(404)
        .json({ message: "Product Not found", error: findProduct });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong, failed to edit product", error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductSchema.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found",
        data: [],
      });
    const deletedProductImage = product.image.split("/");
    const deletedProductPublicId = deletedProductImage
      .slice(deletedProductImage.length - 2, deletedProductImage.length)
      .join("/");

    const result = await imageDelete(deletedProductPublicId);
    console.log(result);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Product delete successfully",
        data: product,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

export const deleteAllProduct = async (req, res) => {
  try {
    const response = await ProductSchema.deleteMany({});
    console.log(response);
    return res.status(200).send("delete all product");
  } catch (error) {
    console.log(error);
  }
};
