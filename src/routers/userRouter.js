import express from "express";

import {
  getSingleUser,
  updateUser,
  deleteUser,
  getAllCustoms,
  deactivateCustom,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.route("/").get(getSingleUser).patch(updateUser).delete(deleteUser);
userRouter.route("/customs").get(getAllCustoms).patch(deactivateCustom);
