import mongoose from "mongoose";

const { Schema, model } = mongoose;

// EMOTIONS SCHEMA
const emotionsSchema = new Schema({
  happiness: { type: [String], default: [] },
  family2: { type: [String], default: [] },
  family3: { type: [String], default: [] },
  family4: { type: [String], default: [] },
  mixedEmotions: { type: [String], default: [] },
});
// FOR EXAMPLE
// customEmotions: {happiness: ["extremely happy", "very happy"], sad: ["devastated", "..."] }

// TAGS SCHEMA
const tagsSchema = new Schema({
  when: { type: [String], default: [] },
  where: { type: [String], default: [] },
  with: { type: [String], default: [] },
  context: { type: [String], default: [] },
});

// USERS SCHEMA
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: String,
    customEmotions: { emotionsSchema },
    customTags: { tagsSchema },
    config: {
      sleepingHours: Boolean,
      physicalActivity: Boolean,
      weather: Boolean,
    },
  },

  { versionKey: false }
);

export const User = model("User", userSchema);
