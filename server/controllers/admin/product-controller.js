import { imageUpload } from "../../helper/cloudinary.js";

export const handleUploadImage = async (req, res) => {
  try {
    const fileBuffer = Buffer.from(req.file.buffer);
    const result = await imageUpload(fileBuffer);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.log(error);
  }
};
