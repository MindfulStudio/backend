import { User } from "../../models/userModel.js";
import { Checkin } from "../../models/checkinModel.js";

// DELETE USER

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User with id [${userId}] not found`,
      });
    }

    // DELETE (USER'S CHECK-INS)
    for (let checkin of user.checkins) {
      await Checkin.findByIdAndDelete(checkin._id);
    }

    // DELETE (USER)
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: `User with id [${userId}] deleted` });
  } catch (error) {
    next(error);
  }
};
