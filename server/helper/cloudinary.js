import { v2 as cloudinary } from "cloudinary";
import keys from "../config/keys.js";

const { cloudName, cloudKey, cloudSecret } = keys;

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudKey,
  api_secret: cloudSecret,
  secure: true,
});

export const imageUpload = async (fileBuffer) => {
  try {
    const fileName = `${Date.now()}-image-product`;
    const res = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "auto", folder: "coba", public_id: fileName },
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        )
        .end(fileBuffer);
    });
    console.log(res, "res");
    return res;
  } catch (error) {
    console.log(error);
  }
};
