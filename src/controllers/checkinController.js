import { Checkin } from "../models/checkinModel.js";
import { User } from "../models/userModel.js";

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
