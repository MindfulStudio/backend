import express from "express";

import { getStatisticsByTag } from "../controllers/statsController.js";

export const statsRouter = express.Router({ mergeParams: true });

statsRouter.route("/tag").get(getStatisticsByTag);
