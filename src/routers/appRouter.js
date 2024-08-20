import express from "express";

import { userRouter } from "./userRouter.js";
import { checkinRouter } from "./checkinRouter.js";

export const appRouter = express.Router();
appRouter.use("/users", userRouter);
appRouter.use("/checkins", checkinRouter);
