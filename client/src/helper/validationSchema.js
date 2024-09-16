import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
  image: Yup.string()
    .required("Image is required")
    .url("Image must be a valid URL"),
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  category: Yup.mixed()
    .oneOf(
      ["men", "women", "kids", "accessories", "footwear"],
      "Invalid category"
    )
    .required("Category is required"),
  brand: Yup.mixed()
    .oneOf(["nike", "adidas", "puma", "levi's", "zara", "h&m"], "Invalid brand")
    .required("Brand is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  salePrice: Yup.number()
    .required("Sale Price is required")
    .positive("Sale Price must be a positive number")
    .max(Yup.ref("price"), "Sale Price cannot exceed the original price"),
  totalStock: Yup.number()
    .required("Total Stock is required")
    .integer("Total Stock must be an integer")
    .min(0, "Total Stock cannot be negative"),
  averageReview: Yup.number()
    .min(0, "Average Review cannot be less than 0")
    .max(5, "Average Review cannot be more than 5")
    .required("Average Review is required"),
});
