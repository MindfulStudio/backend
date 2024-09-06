import { User } from "../../models/userModel.js";

// GET ALL CHECK-INS
export const getAllCheckins = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).populate("checkins");

    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User with id [${userId}] not found`,
      });
    }

    res.status(200).json({ data: user.checkins });
  } catch (error) {
    next(error);
  }
};
