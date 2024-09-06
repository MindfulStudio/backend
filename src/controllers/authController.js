import { hash, compare } from "../utils/crypto.js";
import { User } from "../models/userModel.js";
import { generateAccessToken } from "../utils/jwt.js";
import crypto from "crypto";
import { sendVerificationLink } from "../utils/sendVerificationEmail.js";
import dotenv from "dotenv";

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// REGISTRATION

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({
        error: "missingRegData",
        message: "Missing registration data",
      });

    // PASWORD VALIDATION
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.#$!%*?&^_])[A-Za-z\d@.#$!%*?&^_]{8,}$/;

    const isPasswordValid = passwordRegex.test(password);

    if (!isPasswordValid)
      return res.status(400).json({
        error: "passValidation",
        message: "Password format is invalid",
      });

    // HASH THE PASSWORD
    const hashedPassword = await hash(password);

    if (!hashedPassword)
      return res
        .status(500)
        .json({ error: "hashError", message: "Error on hashing" });

    // GENERATE VERIFICATION TOKEN
    const verificationToken = crypto.randomBytes(32).toString("hex");

    if (!verificationToken)
      return res.status(500).json({
        error: "verTokenError",
        message: "Error on generating verification token",
      });

    // SAVE USER
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      verificationToken, // ADD VERIFICATION TOKEN
    });

    // SEND VERIFICATION EMAIL
    sendVerificationLink(user.email, user.username, verificationToken);

    res.status(201).json({
      message: `User [${user.username}] created successfully; verification email has been sent`,
    });
  } catch (error) {
    next(error);
  }
};

// VERIFY

export const verify = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(401).json({
        error: "verificationTokenMissing",
        message: "Verification token is missing",
      });
    }

    const user = await User.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true }
    );

    if (!user) {
      return res.status(404).json({
        error: "userNotFoundByToken",
        message: `User with verification token [${token}] not found`,
      });
    }

    res.status(200).json({ message: "Verification successfully completed" });
  } catch (error) {
    next(error);
  }
};

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

// LOGOUT

export const logout = async (req, res, next) => {
  try {
    // CLEAR COOKIE
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logout successfull" });
  } catch (error) {
    next(error);
  }
};
