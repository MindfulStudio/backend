import { User } from "../models/userModel.js";

// ONLY FOR FIRST ATTEMPTS:
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
export const getSingleUser = async (req, res, next) => {};
export const postUser = async (req, res, next) => {};
export const updateUser = async (req, res, next) => {};
export const deleteUser = async (req, res, next) => {};
