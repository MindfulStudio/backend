import express from "express";

import {
  getAllCheckins,
  getSingleCheckin,
  postCheckin,
  getCheckinsFromToday,
} from "../controllers/checkinController.js";

export const checkinRouter = express.Router({ mergeParams: true });

checkinRouter.route("/").get(getAllCheckins).post(postCheckin);
// THIS ROUTER SHOULD BE PLACED BEFORE THE ONE WITH /:checkinId
checkinRouter.route("/today").get(getCheckinsFromToday);
checkinRouter.route("/:checkinId").get(getSingleCheckin);
