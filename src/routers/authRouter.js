import express from "express";
import { login, logout, register } from "../controllers/authController.js";

export const authRouter = express.Router();

// LOGIN
authRouter.route("/register").post(register);
// REGISTER
authRouter.route("/login").post(login);
// LOGOUT
authRouter.route("/logout").post(logout);
