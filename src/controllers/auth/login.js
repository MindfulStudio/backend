import { User } from "../../models/userModel.js";
import { Checkin } from "../../models/checkinModel.js";
import { compare } from "../../utils/crypto.js";
import { generateAccessToken } from "../../utils/jwt.js";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// LOGIN

export const login = async (req, res, next) => {
  try {
    const { email, password, stayLoggedIn } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ error: "missingCredentials", message: "Missing login data" });

    // FIND USER VIA EMAIL
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        error: "userNotFound",
        message: `User with email [${email}] not found`,
      });

    const passwordCheck = await compare(password, user.password);

    if (!passwordCheck)
      return res.status(401).json({
        error: "invalidPassword",
        message: `Password is invalid`,
      });

    //  CHECK IF USER IS VERIFIED
    if (!user.isVerified)
      return res.status(401).json({
        error: "userNotVerified",
        message: `User with email [${email}] not verified`,
      });

    if (!accessTokenSecret)
      return res.status(500).json({
        error: "envError",
        message: "Error on getting access token secret",
      });

    // GENERATE ACCESS TOKEN
    const accessToken = generateAccessToken(
      user._id,
      accessTokenSecret,
      stayLoggedIn
    );

    if (!accessToken)
      return res.status(500).json({
        error: "accTokenError",
        message: "Error on generating access token",
      });

    // DELETE TRACKINGS IF TEST USER LOGGED IN
    if (email === process.env.TEST_USER_ACCOUNT) {
      try {
        // DELETE TEST USER'S CHECKINS
        const user = await User.findOne({
          email: process.env.TEST_USER_ACCOUNT,
        });
        for (let checkin of user.checkins) {
          await Checkin.findByIdAndDelete(checkin._id);
        }
        // RESET TEST USER SETTINGS
        await User.updateOne(
          { email: process.env.TEST_USER_ACCOUNT },
          {
            $set: {
              checkins: [],
              config: {
                isConfigured: true,
                sleepingHours: true,
                physicalActivity: true,
                weather: true,
              },
            },
          }
        );
      } catch (err) {
        throw err;
      }
    }

    // SET COOKIE
    res.cookie("accessToken", accessToken, {
      maxAge: stayLoggedIn ? 604800000 : 3600000, // cookie stays for 7 days if user wants to stay logged in, otherwise for 1 hour
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({
      message: `Login with user id [${user._id}] successful.`,
      data: { isConfigured: user.config.isConfigured },
    });
  } catch (error) {
    next(error);
  }
};
