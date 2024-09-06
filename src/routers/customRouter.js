import express from "express";

import { authenticationMiddleware } from "../middlewares/authenticationMiddleware.js";
import { getAllCustoms } from "../controllers/custom/deactivateCustom.js";
import { deactivateCustom } from "../controllers/custom/customController.js";

export const customRouter = express.Router({ mergeParams: true });

customRouter
  .route("/")
  .get(authenticationMiddleware, getAllCustoms)
  .patch(authenticationMiddleware, deactivateCustom);
