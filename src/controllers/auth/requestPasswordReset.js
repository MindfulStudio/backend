import { User } from "../../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL_FRONTEND = process.env.BASE_URL_FRONTEND;

// REQUEST PASSWORD RESET (FORWARD TOKEN)

export const requestPasswordReset = async (req, res, next) => {
  try {
    const { token } = req.query;

    // NOTICE: Workaround: In case of error redirect to error page in frontend:
    if (!token) {
      res.redirect(`${BASE_URL_FRONTEND}/error`);
      return;
    }

    const user = await User.findOne({ passwordResetToken: token });
    // NOTICE: Workaround: In case of error redirect to error page in frontend (with a hint in browser address)
    if (!user) {
      res.redirect(`${BASE_URL_FRONTEND}/link-has-expired`);
      return;
    }
    // Redirect to reset page:
    res.redirect(`${BASE_URL_FRONTEND}/resetpassword/${token}`);
  } catch (error) {
    next(error);
  }
};
