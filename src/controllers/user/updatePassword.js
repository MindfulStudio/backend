import { compare } from "../../utils/crypto.js";
import { User } from "../../models/userModel.js";

// UPDATE PASSWORD

export const updatePassword = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { currentPassword, newPassword } = req.body.passwords;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User with id [${userId}] not found`,
      });
    }
    const isMatching = await compare(currentPassword, user.password);
    if (!currentPassword || !isMatching) {
      return res.status(403).json({
        error: "wrongPassword",
        message: `Missing or incorrect current password`,
      });
    }
    const options = {
      new: true,
      runValidators: true,
    };

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      message: `Password of user with id [${userId}] updated`,
    });
  } catch (error) {
    next(error);
  }
};
