import mongoose, { set } from "mongoose";
import validator from "validator";
import sanitizeHtml from "sanitize-html";

const { Schema, model } = mongoose;

const usernameValidator = (username) => username.length <= 12;
const emailValidator = (email) => validator.isEmail(email);
const passwordValidator = (password) =>
  validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 0,
  });

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
      validate: {
        validator: passwordValidator,
        message:
          "Password must consist of at least 8 characters, including at least one lowercase character, one number and one special character",
      },
    },
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
