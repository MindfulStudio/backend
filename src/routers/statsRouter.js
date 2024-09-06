import express from "express";

import { authenticationMiddleware } from "../middlewares/authenticationMiddleware.js";
import { getStatisticsByFamily } from "../controllers/stats/getStatisticsByFamily.js";
import { getStatisticsByTag } from "../controllers/stats/getStatisticsByTag.js";

export const statsRouter = express.Router({ mergeParams: true });

statsRouter
  .route("/family")
  .get(authenticationMiddleware, getStatisticsByFamily);
statsRouter.route("/tag").get(authenticationMiddleware, getStatisticsByTag);
