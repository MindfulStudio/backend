import mongoose, { set } from "mongoose";
import validator from "validator";
import sanitizeHtml from "sanitize-html";

const { Schema, model } = mongoose;

const usernameValidator = (username) => username.length <= 12;
const emailValidator = (email) => validator.isEmail(email);

const sanitize = (text) => {
  return sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} });
};

// USERS SCHEMA
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      set: (username) => sanitize(username),
      validate: {
        validator: usernameValidator,
        message: "Username too long (maximum: 12 characters)",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      set: (email) => sanitize(email),
      validate: { validator: emailValidator, message: "Invalid email format" },
    },
    password: {
      type: String,
      required: true,
      // VALIDATION HAPPENS IN CONTROLLER
    },
    isVerified: { type: Boolean, default: false },

    verificationToken: {
      type: String,
      required: true,
      set: (token) => sanitize(token),
    },
    config: {
      isConfigured: { type: Boolean, default: false },
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
