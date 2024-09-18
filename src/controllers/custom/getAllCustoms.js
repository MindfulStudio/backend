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
    const customs = { emotions: [], tags: [] };
    user.checkins.forEach((checkin) => {
      // FOR EACH CHECKIN: IF ITEM IS CUSTOM, ADD TO LIST WHILE REMOVING EARLIER VERSIONS
      if (!checkin.emotion.isDefault) {
        customs.emotions = customs.emotions.filter(
          (emo) => emo.name !== checkin.emotion.name
        );
        customs.emotions.push(checkin.emotion);
      }
      // FOR EACH TAG: IF ITEM IS CUSTOM, ADD TO LIST WHILE REMOVING EARLIER VERSIONS
      checkin.tags.forEach((tag) => {
        if (!tag.isDefault) {
          customs.tags = customs.tags.filter((t) => t.name !== tag.name);
          customs.tags.push(tag);
        }
      });
    });
    res.status(200).json({ data: customs });
  } catch (error) {
    next(error);
  }
};
