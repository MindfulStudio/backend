import { User } from "../../models/userModel.js";

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
