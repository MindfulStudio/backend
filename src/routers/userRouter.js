import express from "express";

import { authenticationMiddleware } from "../middlewares/authenticationMiddleware.js";
import { getSingleUser } from "../controllers/user/getSingleUser.js";
import { updateUser } from "../controllers/user/updateUser.js";
import { deleteUser } from "../controllers/user/deleteUser.js";
import { updatePassword } from "../controllers/user/updatePassword.js";

export const userRouter = express.Router();

userRouter
  .route("/")
  .get(authenticationMiddleware, getSingleUser)
  .patch(authenticationMiddleware, updateUser)
  .delete(authenticationMiddleware, deleteUser);
userRouter.route("/password").patch(authenticationMiddleware, updatePassword);
