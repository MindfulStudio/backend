import express from "express";

import { authenticationMiddleware } from "../middlewares/authenticationMiddleware.js";
import {
  getAllCheckins,
  getSingleCheckin,
  postCheckin,
  getCheckinsFromToday,
} from "../controllers/checkinController.js";

export const checkinRouter = express.Router({ mergeParams: true });

checkinRouter
  .route("/")
  .get(authenticationMiddleware, getAllCheckins)
  .post(authenticationMiddleware, postCheckin);
// THIS ROUTER SHOULD BE PLACED BEFORE THE ONE WITH /:checkinId
checkinRouter
  .route("/today")
  .get(authenticationMiddleware, getCheckinsFromToday);
checkinRouter
  .route("/:checkinId")
  .get(authenticationMiddleware, getSingleCheckin);
