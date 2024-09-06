import { Checkin } from "../../models/checkinModel.js";
import { User } from "../../models/userModel.js";

// CREATE CHECK-IN
export const postCheckin = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const checkin = req.body;

    // CREATE NEW CHECK-IN DOCUMENT
    const newCheckin = new Checkin(checkin);
    // FIND USER
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User with id [${userId}] not found`,
      });
    }

    user.checkins.push(newCheckin._id);

    // SAVE NEW CHECK-IN IN CHECK-INS COLLECTION
    await newCheckin.save();

    // SAVE CHANGES IN USER DOCUMENT
    await user.save();

    res.status(201).json({
      message: "Check-in created succesfully",
      data: newCheckin,
    });
  } catch (error) {
    next(error);
  }
};
