import express from "express";

import { authenticationMiddleware } from "../middlewares/authenticationMiddleware.js";
import {
  getSingleUser,
  updateUser,
  deleteUser,
  getAllCustoms,
  deactivateCustom,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter
  .route("/")
  .get(authenticationMiddleware, getSingleUser)
  .patch(authenticationMiddleware, updateUser)
  .delete(authenticationMiddleware, deleteUser);
userRouter
  .route("/customs")
  .get(authenticationMiddleware, getAllCustoms)
  .patch(authenticationMiddleware, deactivateCustom);
