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
export const sendPasswordResetEmail = async (userEmail, userName, token) => {
  const resetLink = `${BASE_URL}/auth/requestPasswordReset?token=${token}`;
  await transporter.sendMail({
    from: SENDER_EMAIL,
    to: userEmail,
    subject: `Passwort zurücksetzen (${appName})`,

    // EMAIL IN TEXT FORMAT:
    text: `Bitte klicke auf den folgenden Link oder kopiere ihn in deinen Browser, um dein Passwort zurückzusetzen: ${resetLink}`,

    // EMAIL IN HTML FORMAT:
    html: `
    <div style="max-width: 500px; font-family: Arial, sans-serif; color: #333333; line-height: 1.6;">
      <p>Hallo ${userName},</p>
      <p>um dein Passwort für die App <strong>${appName}</strong> zurückzusetzen, klicke bitte auf den folgenden Link:</p>
      <p style="text-align: center">
        <a href="${resetLink}" target="_blank" style="background-color: #FFDBDC; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Passwort zurücksetzen</a>
      </p>
      <p style="font-size: 0.8em; color: #999999";>Oder kopiere diesen Link in deinen Browser: <a href="${resetLink}" target="_blank" style="color: #999999;">${resetLink}</a></p>
      <p>Falls du keinen Link zum Zurücksetzen deines Passworts angefordert hast, kannst du diese Email einfach ignorieren.</p>
      <hr style="border: 0; border-top: 1px solid #dddddd; margin: 20px 0;">
      <p style="font-size: 12px; color: #999999;">
        Hinweis: Dies ist eine automatisch generierte E-Mail. Bitte antworte nicht auf diese E-Mail.
      </p>
    </div>
  `,
  });
};
