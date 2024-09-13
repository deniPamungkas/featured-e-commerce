import mongoose from "mongoose";
import keys from "../config/keys.js";

const { dbname, dburl } = keys;

export const dbconnect = async () => {
  try {
    await mongoose.connect(dburl, {
      dbName: dbname,
    });
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};
