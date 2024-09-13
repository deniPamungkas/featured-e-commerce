import { Router } from "express";
import {
  login,
  logout,
  signUp,
} from "../../controllers/auth/auth-controller.js";
import { auth } from "../../middlewares/auth.js";

const route = Router();

route.post("/signUp", signUp);
route.post("/login", login);
route.post("/logout", auth, logout);
route.get("/check-auth", auth, (req, res) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    message: "Authorized",
    user,
  });
});

export default route;
