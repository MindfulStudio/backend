import express from "express";

import {
  getSingleUser,
  postUser,
  verifyUser,
  updateUser,
  deleteUser,
  getAllCustoms,
  deactivateCustom,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter
  .route("/")
  .post(postUser)
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);
userRouter.route("/verify").patch(verifyUser);
userRouter.route("/customs").get(getAllCustoms).patch(deactivateCustom);
