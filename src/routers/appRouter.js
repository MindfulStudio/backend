import express from "express";

import { userRouter } from "./userRouter.js";
import { checkinRouter } from "./checkinRouter.js";
import { statsRouter } from "./statsRouter.js";

export const appRouter = express.Router();
appRouter.use("/users", userRouter);
appRouter.use("/users/:userId/checkins", checkinRouter);
appRouter.use("/users/:userId/stats", statsRouter);
