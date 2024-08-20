import express from "express";

import {
  getAllUsers,
  getSingleUser,
  postUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(postUser);
userRouter
  .route("/:id")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);
