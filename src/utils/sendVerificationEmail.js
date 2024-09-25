import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const appName = "gemischteGefühle";

// CREATE TRANSPORTER
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
});

// SEND VERIFICATION EMAIL
export const sendVerificationLink = async (
  userEmail,
  userName,
  verificationToken
) => {
  const verificationLink = `${BASE_URL}/auth/verify?token=${verificationToken}`;

  await transporter.sendMail({
    from: SENDER_EMAIL,
    to: userEmail,
    subject: `Deine Registrierung bei ${appName}`,

    // EMAIL IN TEXT FORMAT:
    text: `Willkommen bei ${appName}! Hallo ${userName}! Schön, dass du dich für ${appName} registriert hast. Um deine Registrierung abzuschließen, klicke bitte auf den folgenden Link oder kopiere ihn in deinen Browser: ${verificationLink}`,

    // EMAIL IN HTML FORMAT:
    html: `
    <div style="font-family: Arial, sans-serif; color: #333333; line-height: 1.6;">
      <h2 style="color: #007BFF;">Willkommen bei ${appName}!</h2>
      <p>Hallo ${userName}!</p>
      <p>Schön, dass du dich für <strong>${appName}</strong> registriert hast.</p>
      <p>Um deine Registrierung abzuschließen, klicke bitte auf den folgenden Link:</p>
      <p style="text-align: center;">
        <a href="${verificationLink}" target="_blank" style="background-color: #007BFF; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Registrierung bestätigen</a>
      </p>
      <p>Oder kopiere diesen Link in deinen Browser: <a href="${verificationLink}" target="_blank" style="color: #007BFF;">${verificationLink}</a></p>
      <hr style="border: 0; border-top: 1px solid #dddddd; margin: 20px 0;">
      <p style="font-size: 12px; color: #999999;">
        Hinweis: Dies ist eine automatisch generierte E-Mail. Bitte antworte nicht auf diese E-Mail.
      </p>
    </div>
  `,
  });
};
