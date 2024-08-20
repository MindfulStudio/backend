import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { appRouter } from "./routers/appRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { connectToDb } from "./utils/dbConnect.js"; // depending on db connection file

// LOAD ENV VARIABLES
dotenv.config();
const { DB_CONNECTION_STRING } = process.env;
const PORT = process.env.PORT || 3000;

// CREATE EXPRESS APP
export const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// ROUTES
app.use("/", appRouter);
app.use(errorMiddleware);

// CONNECT TO DB
await connectToDb(DB_CONNECTION_STRING); // depending on db connection file

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
