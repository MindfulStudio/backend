import express from "express";

import {
  getSingleUser,
  postUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { getStatisticsByFamily } from "../controllers/statisticsController.js";

export const userRouter = express.Router();

userRouter.route("/").post(postUser);
// .get(getAllUsers);

userRouter
  .route("/:userId")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route("/:userId/statisticsbyfamily").get(getStatisticsByFamily);
