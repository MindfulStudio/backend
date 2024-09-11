import { User } from "../../models/userModel.js";
import crypto from "crypto";
import { sendVerificationLink } from "../../utils/sendVerificationEmail.js";

// REGISTRATION

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({
        error: "missingRegData",
        message: "Missing registration data",
      });

    // GENERATE VERIFICATION TOKEN
    const verificationToken = crypto.randomBytes(32).toString("hex");

    if (!verificationToken)
      return res.status(500).json({
        error: "verTokenError",
        message: "Error on generating verification token",
      });

    // SAVE USER
    const user = await User.create({
      username,
      email,
      password,
      verificationToken, // ADD VERIFICATION TOKEN
    });

    // SEND VERIFICATION EMAIL
    sendVerificationLink(user.email, user.username, verificationToken);

    res.status(201).json({
      message: `User [${user.username}] created successfully; verification email has been sent`,
    });
  } catch (error) {
    next(error);
  }
};
