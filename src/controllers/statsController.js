import { User } from "../models/userModel.js";
import { emotionFamilies } from "../models/checkinModel.js";

// GET STATISTICS FOR A SPECIFIC FAMILY

export const getStatisticsByFamily = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { family } = req.query;

    // FIND USER
    const user = await User.findById(userId).populate("checkins");

    if (!user) {
      return res.status(404).json({
        error: "userNotFound",
        message: `User with id [${userId}] not found`,
      });
    }

    if (!family) {
      return res.status(404).json({
        error: "familyNotFound",
        message: `Family [${family}] not found`,
      });
    }

    // FILTER CHECK-INS CONTAINS THE SELECTED FAMILY
    const checkinsByFamily = user.checkins.filter(
      (checkin) => checkin.emotion.family === family
    );

    const data = {
      family: family,
      stats: [],
      total: checkinsByFamily.length,
    };

    // CREATE A NEW MAP OBJECT
    const tagsMap = new Map();

    // PUSH ALL TAGS IN THESE CHECKINS INTO THE MAP
    checkinsByFamily.forEach((checkin) =>
      checkin.tags.forEach((tag) => {
        // IF IT ALREADY EXISTS...
        if (tagsMap.has(tag.name)) {
          // ...CHANGE THE VALUE OF MAP ELEMENT...
          tagsMap.set(tag.name, tagsMap.get(tag.name) + 1);
          // ...IF IT DOESN'T EXIST...
        } else {
          // ... CREATE A NEW ELEMENT WITH AN INITIAL VALUE
          tagsMap.set(tag.name, 1);
        }
      })
    );

    // CONVERT THE MAP TO AN ARRAY
    data.stats = Array.from(tagsMap, ([name, count]) => ({ name, count }));

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

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

    res
      .status(200)
      .json({ data: { tag: tag, stats, total: checkinsByTag.length } });
  } catch (error) {
    next(error);
  }
};
