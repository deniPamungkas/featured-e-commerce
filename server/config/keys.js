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

const midtransSecret = process.env.MIDTRANS_SERVER_KEY;
const midtransClientSecret = process.env.MIDTRANS_CLIENT_KEY;

export default {
  port,
  dburl,
  dbname,
  jwtkey,
  cloudName,
  cloudKey,
  cloudSecret,
  midtransSecret,
  midtransClientSecret,
};
