import { User } from "../models/userModel.js";
import { emotionFamilies } from "../models/checkinModel.js";

// GET STATS FOR A SPECIFIC TAG

export const getStatsForTag = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const tag = req.query.tag;

    const user = await User.findById(userId).populate("checkins");
    if (!user) {
      return res
        .status(404)
        .json({ message: `User with id [${userId}] not found` });
    }

    // FILTER CHECKINS: ONLY CHECKINS WITH THIS TAG
    const filteredCheckins = user.checkins.filter((check) =>
      check.tags.some((t) => t.name === tag)
    );

    // CREATE A STATS OBJECT WITH COUNT=0 FOR EVERY EMOTION FAMILY
    const stats = {};
    emotionFamilies.map((family) => (stats[family] = 0));

    // INCREASE FAMILY'S COUNT WITH EACH MATCHING CHECKIN
    for (let family in stats) {
      filteredCheckins.forEach((checkin) => {
        if (checkin.emotion.family === family) {
          stats[family]++;
        }
        return stats;
      });
    }

    // CALCULATE TOTAL NUMBER OF CHECKINS WITH THIS TAG
    const total = Object.values(stats).reduce((acc, curr) => acc + curr, 0);

    res.status(200).json({ data: { tagName: tag, stats, total } });
  } catch (error) {
    next(error);
  }
};
