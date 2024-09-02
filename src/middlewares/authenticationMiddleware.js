import { jwtVerify } from "../utils/jwt.js";
import dotenv from "dotenv";

dotenv.config();

/////////////////////// VERIFY ACCESS TOKEN (AND ATTACH IT TO REQ.USER) ///////////////////////

export const authenticationMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies["accessToken"];
    if (!token) {
      return res.status(400).json({
        error: "cookieIsMissing",
        message: "Cookie is missing or has expanded.",
      });
    }
    const verification = await jwtVerify(token);
    if (!verification) {
      return res.status(400).json({
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
