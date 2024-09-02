import express from "express";

import { userRouter } from "./userRouter.js";
import { checkinRouter } from "./checkinRouter.js";
import { statsRouter } from "./statsRouter.js";

export const appRouter = express.Router();
appRouter.use("/users", userRouter);
appRouter.use("/users/checkins", checkinRouter);
appRouter.use("/users/stats", statsRouter);
