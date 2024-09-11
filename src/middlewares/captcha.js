import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const site_secret = process.env.SITE_SECRET;

export const captcha = async (req, res, next) => {
  try {
    const { reCaptchaValue } = req.body;

    // SEND CAPTCHA TO GOOGLE TO VERIFY
    const googleResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${site_secret}&response=${reCaptchaValue}`,
      {
        method: "POST",
      }
    );

    const data = await googleResponse.json();

    if (!googleResponse.ok || !data.success) {
      return res
        .status(400)
        .json({ error: "InvalidCaptcha", message: "Captcha invalid" });
    }
    next();
  } catch (error) {
    next(error);
  }
};
