import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { ACCESS_TOKEN_SECRET } = process.env;

// Verify an accessToken:
export const jwtVerify = async (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      return error;
    } else {
      return payload;
    }
  });
};
