import { User } from "../models/userModel.js";
import { Checkin } from "../models/checkinModel.js";

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users?.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ data: users });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE USER
export const getSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id [${id}] not found` });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

// CREATE NEW USER
export const postUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    if (!user) {
      return res.status(400).json({ message: "User could not be created" });
    }
    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error) {
    next(error);
  }
};

// UPDATE USER
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const options = {
      new: true,
      runValidators: true,
    };
    const user = await User.findByIdAndUpdate(id, update, options);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id [${id}] not found` });
    }
    res
      .status(200)
      .json({ message: `User with id [${id}] updated`, data: user });
  } catch (error) {
    next(error);
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id [${id}] not found` });
    }

    // DELETE (USER'S CHECK-INS)
    user.checkins.forEach(async (checkin) => {
      await Checkin.findByIdAndDelete(checkin._id);
    });

    // DELETE (USER)
    const deleted = await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: `User with id [${id}] deleted`, data: deleted });
  } catch (error) {
    next(error);
  }
};
