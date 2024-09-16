import express from "express";
import { register } from "../controllers/auth/register.js";
import { verify } from "../controllers/auth/verify.js";
import { login } from "../controllers/auth/login.js";
import { logout } from "../controllers/auth/logout.js";
import { captcha } from "../middlewares/captcha.js";

export const authRouter = express.Router();

// LOGIN
authRouter.route("/register").post(captcha, register);
// REGISTER
authRouter.route("/login").post(login);
// VERIFY
authRouter.route("/verify").get(verify);
// LOGOUT
authRouter.route("/logout").post(logout);
