import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;
const dburl = process.env.DATABASE_URL;
const dbname = process.env.DBNAME;
const jwtkey = {
  secret: process.env.JWT_SECRET,
};
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudKey = process.env.CLOUDINARY_API_KEY;
const cloudSecret = process.env.CLOUDINARY_API_SECRET;

export default {
  port,
  dburl,
  dbname,
  jwtkey,
  cloudName,
  cloudKey,
  cloudSecret,
};
