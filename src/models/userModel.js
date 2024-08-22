import mongoose from "mongoose";

const { Schema, model } = mongoose;

// USERS SCHEMA
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, required: true },
    config: {
      sleepingHours: { type: Boolean, default: true },
      physicalActivity: { type: Boolean, default: true },
      weather: { type: Boolean, default: true },
    },
    checkins: {
      type: [mongoose.Types.ObjectId],
      ref: "Checkin",
      default: [],
    },
  },

  { versionKey: false }
);

export const User = model("User", userSchema);
