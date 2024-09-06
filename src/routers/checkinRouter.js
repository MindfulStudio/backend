import express from "express";

import { authenticationMiddleware } from "../middlewares/authenticationMiddleware.js";
import { getAllCheckins } from "../controllers/checkin/getAllCheckins.js";
import { getCheckinsFromToday } from "../controllers/checkin/getCheckinsFromToday.js";
import { getSingleCheckin } from "../controllers/checkin/getSingleCheckin.js";
import { postCheckin } from "../controllers/checkin/postCheckin.js";

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
