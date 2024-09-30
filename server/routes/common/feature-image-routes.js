import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import {
  addFeatureImage,
  getFeatureImages,
} from "../../controllers/common/featureImage-controller.js";

const route = Router();

route.post("/", auth, addFeatureImage);
route.get("/", getFeatureImages);

export default route;
