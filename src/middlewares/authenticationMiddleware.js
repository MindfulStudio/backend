import { jwtVerify } from "../utils/jwt.js";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

/////////////////////// VERIFY ACCESS TOKEN (AND ATTACH IT TO REQ.USER) ///////////////////////

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies["accessToken"];
    console.log("authenticationMiddleware: token", token);

    if (!token) {
      return res.status(401).json({
        error: "cookieIsMissing",
        message: "Cookie is missing or has expanded.",
      });
    }

    if (!accessTokenSecret)
      return res.status(500).json({
        error: "envError",
        message: "Error on getting access token secret",
      });

    const verification = jwtVerify(token, accessTokenSecret);

    if (!verification) {
      return res.status(401).json({
        error: "verificationHasFailed",
        message: "Cookie could not be verified.",
      });
    }
    req.user = verification;
    next();
  } catch (err) {
    next(err);
  }
};
