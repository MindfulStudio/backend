import { User } from "../../models/userModel.js";

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
