import { User } from "../../models/userModel.js";
import { sendPasswordResetEmail } from "../../utils/sendPasswordResetEmail.js";
import crypto from "crypto";

// SEND EMAIL FOR PASSWORD RESET

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(200).json({
        // Keep error message vague for safety reasons:
        message: `Process completed. If this email address exists in database, an email was sent.`,
      });
    }

    // GENERATE RESET TOKEN
    const token = crypto.randomBytes(32).toString("hex");

    if (!token)
      return res.status(500).json({
        error: "verTokenError",
        message: "Error on generating verification token",
      });

    // ASIGN USER A TOKEN FOR EMAIL VERIFICATION
    await User.findByIdAndUpdate(
      user.id,
      { passwordResetToken: token },
      { runValidators: true, new: true }
    );

    // SEND RESET EMAIL
    sendPasswordResetEmail(user.email, user.username, token);

    res.status(200).json({
      // Keep success message vague for safety reasons:
      message: `Process completed. If this email address exists in database, an email was sent.`,
    });
  } catch (error) {
    next(error);
  }
};
