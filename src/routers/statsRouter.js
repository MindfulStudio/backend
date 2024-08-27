import express from "express";
import { getStatisticsByFamily } from "../controllers/statsController.js";

export const statsRouter = express.Router({ mergeParams: true });

statsRouter.route("/family").get(getStatisticsByFamily);
