import { User } from "../../models/userModel.js";

// UPDATE USER

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const update = req.body;
    const options = {
      new: true,
      runValidators: true,
    };
    const user = await User.findByIdAndUpdate(userId, update, options);
    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User with id [${userId}] not found`,
      });
    }
    const { config, _id, username, email } = user;
    res.status(200).json({
      message: `User with id [${userId}] updated`,
      data: { id: _id },
    });
  } catch (error) {
    next(error);
  }
};
