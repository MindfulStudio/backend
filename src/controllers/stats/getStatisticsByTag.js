import { User } from "../../models/userModel.js";
import { emotionFamilies } from "../../models/checkinModel.js";

// GET STATISTICS FOR A SPECIFIC TAG

export const getStatisticsByTag = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { tag } = req.query;

    const user = await User.findById(userId).populate("checkins");

    // ERROR HANDLING
    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User with id [${userId}] not found`,
      });
    }
    if (!tag) {
      return res
        .status(404)
        .json({ error: "tagNotFound", message: `Tag [${tag}] not found` });
    }

    // FILTER CHECK-INS: ONLY CHECK-INS WITH THIS TAG
    const checkinsByTag = user.checkins.filter((check) =>
      check.tags.some((t) => t.name === tag)
    );

    // CREATE A STATS ARRAY WITH COUNT: 0 FOR EVERY EMOTION FAMILY
    const stats = [];
    emotionFamilies.forEach((family) => {
      stats.push({ name: family, count: 0 });
    });

    // INCREASE FAMILY'S COUNT WITH EACH MATCHING CHECK-IN
    checkinsByTag.forEach((checkin) => {
      stats.forEach((family) => {
        if (family.name === checkin.emotion.family) {
          family.count++;
        }
      });
    });
    const filteredStats = stats.filter((family) => family.count > 0);

    res
      .status(200)
      .json({
        data: { tag: tag, stats: filteredStats, total: checkinsByTag.length },
      });
  } catch (error) {
    next(error);
  }
};
