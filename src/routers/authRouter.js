import express from "express";
import { register } from "../controllers/auth/register.js";
import { verify } from "../controllers/auth/verify.js";
import { login } from "../controllers/auth/login.js";
import { logout } from "../controllers/auth/logout.js";
import { ping } from "../controllers/auth/ping.js";
import { captcha } from "../middlewares/captcha.js";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware.js";
import { forgotPassword } from "../controllers/auth/forgotPassword.js";
import { requestPasswordReset } from "../controllers/auth/requestPasswordReset.js";
import { resetPassword } from "../controllers/auth/resetPassword.js";

export const authRouter = express.Router();

// PING
authRouter.route("/ping").get(ping);
// LOGIN
authRouter.route("/register").post(captcha, register);
// REGISTER
authRouter.route("/login").post(login);
// VERIFY
authRouter.route("/verify").get(verify);
// LOGOUT
authRouter.route("/logout").post(logout);
// VERIFY COOKIE FOR REDIRECTING
authRouter
  .route("/verifyCookie")
  .get(authenticationMiddleware, async (req, res, next) => {
    res.status(200).json({ isValid: true });
  });
// FORGOT & RESET PASSWORD
authRouter.route("/forgotPassword").post(forgotPassword);
authRouter.route("/requestPasswordReset").get(requestPasswordReset);
authRouter.route("/resetPassword").patch(resetPassword);
