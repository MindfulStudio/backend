import express from "express";

import {
  getSingleUser,
  postUser,
  updateUser,
  deleteUser,
  getAllCustoms,
  deactivateCustom,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.route("/").post(postUser);
userRouter
  .route("/:userId")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);
userRouter.route("/:userId/customs").get(getAllCustoms).patch(deactivateCustom);
