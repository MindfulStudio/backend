import mongoose from "mongoose";

export const connectDB = async (db_url) => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    mongoose.connection.on("error", () => {
      console.log("MongoDB connection failed");
    });

    return await mongoose.connect(db_url);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
