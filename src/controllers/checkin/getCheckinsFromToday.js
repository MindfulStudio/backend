import { User } from "../../models/userModel.js";

// GET CHECK-INS FROM TODAY
export const getCheckinsFromToday = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).populate("checkins");

    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User with id [${userId}] not found`,
      });
    }

    // DATE SETUP
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // FIND CHECKINS CREATED TODAY
    const checkinsToday = user.checkins.filter(
      (checkin) => checkin.createdAt >= startOfToday
    );

    res.status(200).json({ data: checkinsToday });
  } catch (error) {
    next(error);
  }
};
