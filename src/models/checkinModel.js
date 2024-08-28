import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const emotionFamilies = [
  "Anspannung",
  "Freude",
  "Trauer",
  "Entspannung",
  "Gemischte Gefühle",
];
const tagCategories = ["wann", "wo", "mit wem", "was", "kontext"];

const checkinSchema = new Schema(
  {
    // checkinsToday: { type: Number }, // NECESSARY?
    emotion: {
      family: {
        type: String,
        enum: emotionFamilies,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      isDefault: { type: Boolean, default: true },
      isActive: { type: Boolean, default: true },
    },
    tags: [
      {
        category: {
          type: String,
          enum: tagCategories,
          required: true,
        },
        name: { type: String, required: true },
        isDefault: { type: Boolean, default: true },
        isActive: { type: Boolean, default: true },
        _id: false,
      },
    ],
    comment: { type: String, default: null },
    sleepingHours: Number,
    physicalActivity: Boolean,
    weather: String,
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

export const Checkin = model("Checkin", checkinSchema);
