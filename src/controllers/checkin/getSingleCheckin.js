import { User } from "../../models/userModel.js";

// GET SINGLE CHECK-IN
export const getSingleCheckin = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { checkinId } = req.params;

    const user = await User.findById(userId).populate("checkins");

    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User with id [${userId}] not found`,
      });
    }

    const checkin = user.checkins.find(
      (checkin) => checkin._id.toString() === checkinId
    );

    if (!checkin) {
      return res
        .status(404)
        .json({ error: "checkinNotFound", message: "Checkin not found" });
    }

    res.status(200).json({ data: checkin });
  } catch (error) {
    next(error);
  }
};
