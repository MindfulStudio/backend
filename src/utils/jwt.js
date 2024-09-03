import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
const { ACCESS_TOKEN_SECRET } = process.env;

// GENERATE ACCESS TOKEN:
export const generateAccessToken = (id) => {
  return jwt.sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

// VERIFY ACCESS TOKEN:
export const jwtVerify = (token) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      return error;
    } else {
      return payload;
    }
  });
};
