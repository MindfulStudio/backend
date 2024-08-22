import mongoose from "mongoose";

const { Schema, model } = mongoose;

const checkinSchema = new Schema(
  {
    // checkinsToday: { type: Number }, // NECESSARY?
    emotion: {
      family: {
        type: String,
        enum: ["family1", "family2", "family3", "family4"],
        required: true,
      },
      name: { type: String, required: true },
      isDefault: { type: Boolean, default: true },
      isActive: { type: Boolean, default: true },
    },
    tags: [
      {
        category: {
          type: String,
          enum: ["when", "where", "with", "context"],
          required: true,
        },
        name: [{ type: String, required: true }],
        isDefault: { type: Boolean, default: true },
        isActive: { type: Boolean, default: true },
      },
    ],
    comment: { type: String, default: null },
    sleepingHours: Number,
    physicalActivity: Boolean,
    weather: String,
  },
  { timestamps: true, versionKey: false }
);

export const Checkin = model("Checkin", checkinSchema);
