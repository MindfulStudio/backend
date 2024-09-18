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

    // DATA TEMPLATE TO FILL IN
    const data = {
      family,
      stats: [],
      checkinsTotal: checkinsByFamily.length,
    };

    // IF THERE IS NO CHECK IN WITH SELECTED FAMILY, RETURN THE DATA TEMPLATE WITH EMPTY STATS
    if (checkinsByFamily.length === 0) {
      return res.status(404).json({ data });
    }

    // FOR EACH CHECK IN BY SELECTED FAMILY NAME...
    checkinsByFamily.forEach((checkin) => {
      // ...AND FOR EACH TAG IN THIS CHECK IN...
      checkin.tags.forEach((tag) => {
        //...CHECK IF THE STATISTIC FOR THIS FAMILY AND NAME ALREADY EXISTS IN STAT ARRAY...
        const existingStat = data.stats.find(
          (stat) => stat.category === tag.category && stat.name === tag.name
        );
        //...IF YES INCREMENT THE COUNT
        if (existingStat) {
          existingStat.count++;
        } else {
          data.stats.push({ category: tag.category, name: tag.name, count: 1 });
        }
      });
    });

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};
