import mongoose, { set } from "mongoose";
import sanitizeHtml from "sanitize-html";

const { Schema, model } = mongoose;

const emotionNameValidator = (name) => name.length <= 18;
const tagNameValidator = (name) => name.length <= 18;
const commentValidator = (comment) => comment.length <= 200;

const sanitize = (text) => {
  return sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} });
};

export const emotionFamilies = [
  "Anspannung",
  "Freude",
  "Trauer",
  "Entspannung",
  "gemischte Gefühle",
];
const tagCategories = ["wann", "wo", "mitWem", "was"];

const weatherOptions = [
  "sonnig",
  "bewölkt",
  "regnerisch",
  "wechselhaft",
  "stürmisch",
  "windig",
  "schneit",
];

const checkinSchema = new Schema(
  {
    emotion: {
      family: {
        type: String,
        enum: emotionFamilies,
        required: true,
      },
      name: {
        type: String,
        required: true,
        set: (name) => sanitize(name),
        validate: {
          validator: emotionNameValidator,
          message: "Emotion name too long (maximum: 18 characters)",
        },
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
        name: {
          type: String,
          required: true,
          set: (name) => sanitize(name),
          validate: {
            validator: tagNameValidator,
            message: "Tag name too long (maximum: 18 characters)",
          },
        },
        isDefault: { type: Boolean, default: true },
        isActive: { type: Boolean, default: true },
        _id: false,
      },
    ],
    comment: {
      type: String,
      default: null,
      set: (comment) => sanitize(comment),
      validate: {
        validator: commentValidator,
        message: "Comment too long (maximum: 200 characters)",
      },
    },
    config: {
      sleepingHours: Number,
      physicalActivity: Boolean,
      weather: { type: String, enum: weatherOptions },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

export const Checkin = model("Checkin", checkinSchema);
