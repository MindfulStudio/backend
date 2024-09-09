import { User } from "../../models/userModel.js";

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
    const customs = { emotions: [{name: Niedergeschlagen}], tags: [] };
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
