import express from "express";
import { getStatisticsByFamily,getStatisticsByTag} from "../controllers/statsController.js";

export const statsRouter = express.Router({ mergeParams: true });

statsRouter.route("/family").get(getStatisticsByFamily);
statsRouter.route("/tag").get(getStatisticsByTag);