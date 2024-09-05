import { User } from "../models/userModel.js";
import { Checkin } from "../models/checkinModel.js";

//////////////////////// ON USER LEVEL ////////////////////////

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

    res.status(200).json({ data: user });
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
    res
      .status(200)
      .json({ message: `User with id [${userId}] updated`, data: user });
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
    res
      .status(200)
      .json({ message: `User with id [${userId}] deleted`, data: deleted });
  } catch (error) {
    next(error);
  }
};

//////////////////////// ON CUSTOMS LEVEL ////////////////////////

// GET CUSTOM ITEMS (EMOTIONS & TAGS)

export const getAllCustoms = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).populate("checkins");
    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User with id [${userId}] not found`,
      });
    }

    // CREATE LIST OF USER'S CUSTOM ITEMS:
    const customs = { emotions: [], tags: [] };
    user.checkins.forEach((checkin) => {
      // FOR EACH CHECKIN: IF ITEM IS CUSTOM AND NOT ALREADY IN LIST, ADD TO LIST
      if (
        !checkin.emotion.isDefault &&
        !customs.emotions.some((emo) => emo.name === checkin.emotion.name)
      ) {
        customs.emotions.push(checkin.emotion);
      }
      // FOR EACH TAG: IF TAG IS CUSTOM AND NOT ALREADY IN LIST, ADD TO LIST
      checkin.tags.forEach((tag) => {
        if (!tag.isDefault && !customs.tags.some((t) => t.name === tag.name)) {
          customs.tags.push(tag);
        }
      });
    });
    res.status(200).json({ data: customs });
  } catch (error) {
    next(error);
  }
};

// DEACTIVATE CUSTOM ITEM (EMOTION OR TAG)

export const deactivateCustom = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { type, name } = req.body;
    if (!type || !name) {
      return res.status(400).json({
        error: "missingInfo",
        message:
          "Please provide type and name of the custom item you want to deactivate.",
      });
    }

    // FIND USER'S CHECK-INS
    const user = await User.findById(userId).populate("checkins");
    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User with id [${userId}] not found`,
      });
    }

    let isUpdated = false;
    // MAP THROUGH USER'S CHECK-INS
    user.checkins.map(async (checkin) => {
      // IF EMOTION IS CUSTOM AND MATCHES NAME, DEACTIVATE IT
      if (type === "emotion" && checkin.emotion.name === name) {
        checkin.emotion.isActive = false;
        isUpdated = true;
        return checkin.save();
      } else if (type === "tag") {
        // MAP THROUGH TAGS; IF TAG IS CUSTOM AND MATCHES NAME, DEACTIVATE IT
        checkin.tags.forEach((tag) => {
          if (tag.name === name) {
            tag.isActive = false;
            isUpdated = true;
            return checkin.save();
          }
        });
      }
    });
    // IF ITEM WAS NOT FOUND, RETURN ERROR MESSAGE
    if (!isUpdated) {
      return res.status(404).json({
        error: "customNotFound",
        message: `Custom item [${name}] of type [${type}] not found.`,
      });
    }

    // RETURN SUCCESS MESSAGE
    res.status(200).json({
      message: `Custom item(s) updated successfully.`,
    });
  } catch (error) {
    next(error);
  }
};
