import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB.js";

//SINCE WE WORK IN SRC, PATH IS NECESSARY
dotenv.config({ path: "../.env" });

const db_url = process.env.DB_URL;

//CONNECT TO DB
await connectDB(db_url);
