import { User } from "../../models/userModel.js";
import { compare } from "../../utils/crypto.js";
import { generateAccessToken } from "../../utils/jwt.js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// LOGIN

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

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
    const accessToken = generateAccessToken(user._id, accessTokenSecret);

    if (!accessToken)
      return res.status(500).json({
        error: "accTokenError",
        message: "Error on generating access token",
      });

    // SET COOKIE
    res.cookie("accessToken", accessToken, {
      maxAge: 3600 * 1000,
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({
      message: `Login with user id [${user._id}] successfull.`,
      data: { isConfigured: user.config.isConfigured },
    });
  } catch (error) {
    next(error);
  }
};