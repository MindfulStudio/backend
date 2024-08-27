import { User } from "../models/userModel.js";
import { emotionFamilies } from "../models/checkinModel.js";

// GET STATS FOR A SPECIFIC TAG

export const getStatisticsByTag = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { tag } = req.query;

    const user = await User.findById(userId).populate("checkins");

    // ERROR HANDLING
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id [${userId}] not found` });
    }
    if (!tag) {
      return res.status(400).json({ message: `Tag [${tag}] not found` });
    }

    // FILTER CHECK-INS: ONLY CHECK-INS WITH THIS TAG
    const checkinsByTag = user.checkins.filter((check) =>
      check.tags.some((t) => t.name === tag)
    );

    // CALCULATE TOTAL NUMBER OF CHECK-INS WITH THIS TAG
    const total = checkinsByTag.length;

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

    res.status(200).json({ data: { tagName: tag, stats, total } });
  } catch (error) {
    next(error);
  }
};
