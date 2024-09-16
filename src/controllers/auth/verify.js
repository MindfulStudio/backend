import { User } from "../../models/userModel.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const BASE_URL_FRONTEND = process.env.BASE_URL_FRONTEND;

// VERIFY

export const verify = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(401).json({
        error: "verificationTokenMissing",
        message: "Verification token is missing",
      });
    }

    const user = await User.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true }
    );

    if (!user) {
      return res.status(404).json({
        error: "userNotFoundByToken",
        message: `User with verification token [${token}] not found`,
      });
    }
    res.redirect(`${BASE_URL_FRONTEND}/anmeldung`);
  } catch (error) {
    next(error);
  }
};
