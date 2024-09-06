import { User } from "../models/userModel.js";
import { Checkin } from "../models/checkinModel.js";

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
    res.status(200).json({ data: { config, id: _id, username, email } });
  } catch (error) {
    next(error);
  }
};

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
      data: { config, id: _id, username, email },
    });
  } catch (error) {
    next(error);
  }
};

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
    const deleted = await User.findByIdAndDelete(userId);
    res.status(200).json({ message: `User with id [${userId}] deleted` });
  } catch (error) {
    next(error);
  }
};
