import express from "express";

import {
  getAllCheckins,
  getSingleCheckin,
  postCheckin,
  updateCheckin,
  deleteCheckin,
} from "../controllers/checkinController.js";

export const checkinRouter = express.Router();

checkinRouter.route("/").get(getAllCheckins).post(postCheckin);
checkinRouter
  .route("/:id")
  .get(getSingleCheckin)
  .patch(updateCheckin)
  .delete(deleteCheckin);
