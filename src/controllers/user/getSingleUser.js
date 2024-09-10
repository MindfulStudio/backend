import { User } from "../../models/userModel.js";

// GET SINGLE USER

export const getSingleUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User with id [${userId}] not found`,
      });
    }
    const { config, _id, username, email } = user;
    res.status(200).json({ data: { config, username, email } });
  } catch (error) {
    next(error);
  }
};
