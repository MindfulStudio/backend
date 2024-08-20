import mongoose from "mongoose";

const { Schema, model } = mongoose;

const checkinSchema = new Schema(
  {
    // Reference to User collection
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // todayCount: { type: Number }, // NECESSARY?
    emotion: {
      family: String,
      name: [String],
    },
    tags: {
      when: [String],
      where: [String],
      with: [String],
      context: [String],
    },
    comment: String,
    sleepingHours: Number,
    physicalActivity: Boolean,
    weather: String,
  },
  { timestamps: true, versionKey: false }
);

export const Checkin = model("Checkin", checkinSchema);
