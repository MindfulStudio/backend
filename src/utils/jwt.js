import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const { ACCESS_TOKEN_SECRET } = process.env;

//  Create an accessToken:
export const jwtSign = async (email, userId, username) => {
  console.log(ACCESS_TOKEN_SECRET);
  return await jwt.sign({ email, userId, username }, ACCESS_TOKEN_SECRET, {
    expiresIn: "120m",
  });
};

// Verify an accessToken:
export const jwtVerify = async (token) => {
  return await jwt.verify(token, ACCESS_TOKEN_SECRET, (error, payload) => {
    if (error) {
      return error;
    } else {
      return payload;
    }
  });
};
