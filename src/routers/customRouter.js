import express from "express";

import { authenticationMiddleware } from "../middlewares/authenticationMiddleware.js";
import {
  getAllCustoms,
  deactivateCustom,
} from "../controllers/customController.js";

export const customRouter = express.Router({ mergeParams: true });

customRouter
  .route("/")
  .get(authenticationMiddleware, getAllCustoms)
  .patch(authenticationMiddleware, deactivateCustom);
