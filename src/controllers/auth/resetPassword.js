import { User } from "../../models/userModel.js";

// RESET & SET NEW PASSWORD

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!password || !token)
      return res.status(400).json({
        error: "missingData",
        message: "Missing data in request",
      });

    const user = await User.findOne({
      passwordResetToken: token,
    });
    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User not found`,
      });
    }

    user.password = password;
    await user.save();

    res.status(200).json({
      message: `Password successfully updated`,
    });
  } catch (error) {
    next(error);
  }
};
