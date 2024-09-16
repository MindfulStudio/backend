import mongoose from "mongoose";
import validator from "validator";
import sanitizeHtml from "sanitize-html";
import { hash } from "../utils/crypto.js";

const { Schema, model } = mongoose;

const usernameValidator = (username) =>
  username.length >= 3 && username.length <= 12;
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
      validate: {
        validator: (password) => {
          const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.#$!%*?&^_])[A-Za-z\d@.#$!%*?&^_]{8,}$/;
          return passwordRegex.test(password);
        },
        message: "Password format is invalid",
      },
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

// HASHING BEFORE SAVING
userSchema.pre("save", async function (next) {
  const user = this;
  // IF PASSWORD CHANGES...
  if (user.isModified("password")) {
    try {
      // ...HASH THE PASSWORD
      const hashedPassword = await hash(user.password);
      if (!hashedPassword) throw new Error("Error on hashing");
      // CHANGE THE PASSWORD WITH THE HASHED ONE
      user.password = hashedPassword;
    } catch (error) {
      console.error(error);
      // FORWARD THE ERROR TO ERROR MIDDLEWARE
      return next(error);
    }
  }
  // CONTINUE WITH SAVING
  next();
});

export const User = model("User", userSchema);
