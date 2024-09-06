import { User } from "../../models/userModel.js";

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

    res.status(200).json({ message: "Verification successfully completed" });
  } catch (error) {
    next(error);
  }
};
