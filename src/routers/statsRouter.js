import express from "express";

import { getStatsForTag } from "../controllers/statsController.js";

export const statsRouter = express.Router({ mergeParams: true });

statsRouter.route("/tag").get(getStatsForTag);
