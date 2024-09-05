import express from "express";
import {
  login,
  logout,
  register,
  verify,
} from "../controllers/authController.js";

export const authRouter = express.Router();

// LOGIN
authRouter.route("/register").post(register);
// REGISTER
authRouter.route("/login").post(login);
// VERIFY
authRouter.route("/verify").get(verify);
// LOGOUT
authRouter.route("/logout").post(logout);
