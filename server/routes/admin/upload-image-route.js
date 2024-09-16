import { Router } from "express";
import upload from "../../helper/multer.js";
import {
  addNewProduct,
  handleUploadImage,
} from "../../controllers/admin/product-controller.js";
import { auth } from "../../middlewares/auth.js";

const route = Router();

// route.post("/image", (req, res) => {
//   upload.single("file")(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       if (err.code === "LIMIT_FILE_SIZE") {
//         return res.status(400).json({ message: "File size is too large!" });
//       }
//       if (err.code === "ONLY_IMAGE") {
//         return res.status(400).json({ message: "only images are allowed" });
//       }
//     } else if (err) {
//       return res.status(400).json({ message: err.message });
//     }
//     try {
//       res.status(200).send({
//         success: true,
//         message: "file uploaded successfully",
//         data: req.file,
//       });
//     } catch (error) {
//       res.status(500).send({
//         success: false,
//         message: "failed to upload file, please try again!",
//       });
//     }
//   });
// });

route.post("/image-upload", upload.single("file"), handleUploadImage);
route.post("/add-product", auth, addNewProduct);

export default route;
