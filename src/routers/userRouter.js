import express from "express";

import {
  getSingleUser,
  postUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.route("/").post(postUser);
// .get(getAllUsers);

userRouter
  .route("/:userId")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);
