<details>
<summary>🇬🇧 English</summary>

# Backend for a Mental Health App

## 📖 Description

This is the backend for a mental health application that allows users to log and analyze their emotional states along with contextual details. It supports user authentication using cookies and JSON Web Token. This backend provides endpoints for registration, login/logout, and email verification of users and endpoints that allow users to manage and evaluate their regular check-ins. It is built using Node.js, Express.js, and MongoDB with Mongoose for data modeling.

## 🛠 Technologies Used

- **Backend & Server:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Token, Cookies, Nodemailer
- **Captcha:** Google reCAPTCHA
- **Validation:** Mongoose Schema Validation

---

## 🚀 Installation

<details>
<summary>Installation Instructions</summary>

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Copy the .env.example file and rename it to .env. Fill in the required environment variables.

5. Start the server:

```bash
npm run dev
```

</details>

---

## 📑 API Documentation

The following overviews summarize all possible operations along with their respective endpoints, HTTP methods, body content to be sent in requests, and expected response messages.

---

<details>
<summary>Authentication Requests</summary>

### Authentication Requests

| **Request**            | **Endpoint**                           | **HTTP Method** | **Body**                      | **Status** | **Error Messages**                                                                          |
| ---------------------- | -------------------------------------- | --------------- | ----------------------------- | ---------- | ------------------------------------------------------------------------------------------- |
| Registration           | /auth/register                         | POST            | username, email, password     | 201        | missingRegData, passValidation, hashError, verTokenError, alreadyRegistered                 |
| Login                  | /auth/login                            | POST            | email, password, stayLoggedIn | 201        | missingCredentials, userNotFound, invalidPassword, userNotVerified, envError, accTokenError |
| Logout                 | /auth/logout                           | POST            | /                             | 200        | /                                                                                           |
| Verification           | /auth/verify?token=TOKEN               | GET             | /                             | 200        | verificationTokenMissing, userNotFoundByToken                                               |
| Verify Cookie          | /auth/verifyCookie                     | GET             | /                             | 200        | /                                                                                           |
| Forgot Password        | /auth/forgotPassword                   | POST            | email                         | 200        | verTokenError                                                                               |
| Request Password Reset | /auth/requestPasswordReset?token=TOKEN | GET             | /                             | redirect   | verTokenError                                                                               |
| Reset Password         | /auth/resetPassword                    | PATCH           | token, password               | 200        | missingData, userNotFound                                                                   |

</details>

---

<details>
<summary>Requests After Successful Authentication</summary>

### Requests After Successful Authentication

**Note:** For all endpoints outside of authentication operations, a valid session is required. This session is identified by a cookie received upon successful login via the `/auth/login` endpoint.

| **Request**                  | **Endpoint**                      | **HTTP Method** | **Body (Example)**                        | **Status** | **Error Messages**                        |
| ---------------------------- | --------------------------------- | --------------- | ----------------------------------------- | ---------- | ----------------------------------------- |
| Get User Data                | /users                            | GET             | /                                         | 200        | userNotFound                              |
| Update User Data             | /users                            | PATCH           | username                                  | 200        | userNotFound                              |
| Update User Password         | /users/updatePassword             | PATCH           | passwords: {currentPassword, newPassword} | 200        | userNotFound, wrongPassword               |
| Delete User                  | /users                            | DELETE          | /                                         | 200        | userNotFound                              |
| Get All Check-ins            | /users/checkins                   | GET             | /                                         | 200        | userNotFound                              |
| Get Today's Check-ins        | /users/checkins/today             | GET             | /                                         | 200        | userNotFound                              |
| Get Single Check-in          | /users/checkins/:checkinId        | GET             | /                                         | 200        | userNotFound, checkinNotFound             |
| Create Check-in              | /users/checkins                   | POST            | emotion, tags, comment, config            | 201        | userNotFound                              |
| Statistics by Emotion Family | /users/stats/family?family=FAMILY | GET             | /                                         | 200        | userNotFound, familyNotFound              |
| Statistics by Context Tag    | /users/stats/tag?tag=TAG          | GET             | /                                         | 200        | userNotFound, tagNotFound                 |
| Get Custom Items             | /users/customs                    | GET             | /                                         | 200        | userNotFound                              |
| Deactivate Custom Item       | /users/customs                    | PATCH           | type, name                                | 200        | userNotFound, missingInfo, customNotFound |

</details>

---

<details>
<summary>Error Messages</summary>

### Error Messages

This table summarizes all possible error messages that the server returns in case of issues.

| **Subject**                                 | **Error**                | **Message**                                                             | **Status** |
| ------------------------------------------- | ------------------------ | ----------------------------------------------------------------------- | ---------- |
| User not found                              | userNotFound             | User with id [userId] not found                                         | 404        |
| Missing information in body                 | missingInfo              | Please provide type and name of the custom item you want to deactivate. | 400        |
| Custom not found                            | customNotFound           | Custom item [name] of type [type] not found.                            | 404        |
| Checkin not found                           | checkinNotFound          | Checkin not found                                                       | 404        |
| Family not found                            | familyNotFound           | Family [family] not found                                               | 404        |
| Tag not found                               | tagNotFound              | Tag [tag] not found                                                     | 404        |
| Error on user verification check            | userNotVerified          | User with email [email] not verified                                    | 401        |
| Cookie is missing                           | cookieIsMissing          | Cookie is missing or has expired.                                       | 400        |
| Verification has failed                     | verificationHasFailed    | Cookie could not be verified.                                           | 400        |
| Missing credentials                         | missingCredentials       | Missing login data                                                      | 400        |
| Missing registration data                   | missingRegData           | Missing registration data                                               | 400        |
| Invalid password                            | invalidPassword          | Password is invalid                                                     | 400        |
| Error on hashing                            | hashError                | Error on hashing                                                        | 500        |
| Error on generating verification token      | verTokenError            | Error on generating verification token                                  | 500        |
| Error on password validation                | passValidation           | Password format is invalid                                              | 400        |
| Error on getting access token secret        | envError                 | Error on getting access token secret                                    | 500        |
| Error on generating access token            | accTokenError            | Error on generating access token                                        | 500        |
| Verification token is missing               | verificationTokenMissing | Verification token is missing                                           | 401        |
| User with this verification token not found | userNotFoundByToken      | User with verification token [token] not found                          | 404        |
| Wrong Password (at password change)         | wrongPassword            | Missing or incorrect current password                                   | 403        |

</details>

---

## 🎓 Project Context

This backend project is part of a collaborative final project completed by [luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney), [Barış Balcı](https://github.com/barisbalcimusic), and [hannahnier](https://github.com/hannahnier) at the end of a one-year full-time course in Fullstack Web Development. It operates alongside a [Frontend repository](https://github.com/MindfulStudio/frontend) to create a comprehensive Browser Application on the subject of Mental Health.

---

## 📜 License

To be added.

---

## 📧 Contact

[luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney), [Barış Balcı](https://github.com/barisbalcimusic), [hannahnier](https://github.com/hannahnier)

</details>

<details>
  <summary>🇩🇪 Deutsch</summary>

# Backend für eine Mental-Health-App

## 📖 Beschreibung

Dies ist das Backend für eine Browser-App im Bereich der mentalen Gesundheit, die es Nutzer\*innen ermöglicht, emotionale Zustände und die dazugehörigen Kontextinformationen zu erfassen. Die Benutzerauthentifizierung speichert Tokens in Cookies und funktioniert mittels JSON Web Token. Das Backend stellt Endpoints für die Registrierung, Login/Logout und E-Mail-Verifizierung bereit und bietet Nutzer\*innen die Möglichkeit, die gemachten Angaben zu Emotionen und Kontext zu managen und auszuwerten. Das Backend basiert auf Node.js, Express.js und MongoDB mit Mongoose für die Datenmodellierung.

## 🛠 Verwendete Technologien

- **Backend & Server:** Node.js, Express.js
- **Datenbank:** MongoDB, Mongoose
- **Authentifizierung:** JSON Web Token, Cookies, Nodemailer
- **Captcha:** Google reCAPTCHA
- **Validierung:** Mongoose Schema-Validierung

---

## 🚀 Installation

<details>
<summary>Anleitung zur Installation</summary>

1. Klone das Repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigiere zum Projektverzeichnis:

   ```bash
   cd <projekt-verzeichnis>
   ```

3. Installiere die Abhängigkeiten:

   ```bash
   npm install
   ```

4. Kopiere die `.env.example`-Datei und benenne sie in `.env` um. Fülle die erforderlichen Umgebungsvariablen aus.

5. Starte den Server:

   ```bash
   npm run dev
   ```

</details>

---

## 📑 API-Dokumentation

Die nachfolgenden Übersichten fassen alle möglichen Operationen mit ihren dazugehörigen Endpoints, HTTP-Methoden und den im Body der Anfrage zu sendenden Informationen und zu erwartenden Antwortnachrichten zusammen.

---

<details>
<summary>Anfragen zur Authentifizierung</summary>

### Authentifizierung

| **Operation**              | **Endpoint**                           | **HTTP-Methode** | **Body**                      | **Status** | **Fehlermeldungen**                                                                         |
| -------------------------- | -------------------------------------- | ---------------- | ----------------------------- | ---------- | ------------------------------------------------------------------------------------------- |
| Registrierung              | /auth/register                         | POST             | username, email, password     | 201        | missingRegData, passValidation, hashError, verTokenError, alreadyRegistered                 |
| Login                      | /auth/login                            | POST             | email, password, stayLoggedIn | 201        | missingCredentials, userNotFound, invalidPassword, userNotVerified, envError, accTokenError |
| Logout                     | /auth/logout                           | POST             | /                             | 200        | /                                                                                           |
| Verifizierung              | /auth/verify?token=TOKEN               | GET              | /                             | 200        | verificationTokenMissing, userNotFoundByToken                                               |
| Cookie verifizieren        | /auth/verifyCookie                     | GET              | /                             | 200        | /                                                                                           |
| Password vergessen         | /auth/forgotPassword                   | POST             | email                         | 200        | verTokenError                                                                               |
| Passwortänderung anfordern | /auth/requestPasswordReset?token=TOKEN | GET              | /                             | redirect   | verTokenError                                                                               |
| Passwort zurücksetzen      | /auth/resetPassword                    | PATCH            | token, password               | 200        | missingData, userNotFound                                                                   |

</details>

---

<details>
<summary>Anfragen nach erfolgreicher Authentifizierung</summary>

---

### Anfragen nach erfolgreicher Authentifizierung

**Hinweis:** Für alle Endpunkte außerhalb der Authentifizierungs-Operationen ist eine gültige Sitzung erforderlich. Diese Sitzung wird durch einen Cookie identifiziert, den man beim erfolgreichen Login über den Endpunkt `/auth/login` erhält.

| **Operation**                    | **Endpoint**                      | **HTTP-Methode** | **Body (Beispiel)**                       | **Status** | **Fehlermeldungen**                       |
| -------------------------------- | --------------------------------- | ---------------- | ----------------------------------------- | ---------- | ----------------------------------------- |
| Userdaten abrufen                | /users                            | GET              | /                                         | 200        | userNotFound                              |
| Userdaten aktualisieren          | /users                            | PATCH            | username                                  | 200        | userNotFound                              |
| Passwort aktualisieren           | /users/updatePassword             | PATCH            | passwords: {currentPassword, newPassword} | 200        | userNotFound, wrongPassword               |
| User löschen                     | /users                            | DELETE           | /                                         | 200        | userNotFound                              |
| Alle Check-ins abrufen           | /users/checkins                   | GET              | /                                         | 200        | userNotFound                              |
| Check-ins von heute abrufen      | /users/checkins/today             | GET              | /                                         | 200        | userNotFound                              |
| Einzelnen Check-in abrufen       | /users/checkins/:checkinId        | GET              | /                                         | 200        | userNotFound, checkinNotFound             |
| Check-in erstellen               | /users/checkins                   | POST             | emotion, tags, comment, config            | 201        | userNotFound                              |
| Statistiken nach Emotionsfamilie | /users/stats/family?family=FAMILY | GET              | /                                         | 200        | userNotFound, familyNotFound              |
| Statistiken nach Kontext-Begriff | /users/stats/tag?tag=TAG          | GET              | /                                         | 200        | userNotFound, tagNotFound                 |
| Eigene Elemente abrufen          | /users/customs                    | GET              | /                                         | 200        | userNotFound                              |
| Eigenes Element deaktivieren     | /users/customs                    | PATCH            | type, name                                | 200        | userNotFound, missingInfo, customNotFound |

</details>

---

<details>
<summary>Fehlermeldungen</summary>

### Fehlermeldungen

Diese Tabelle enthält eine Übersicht aller möglichen Fehlermeldungen, die der Server bei Problemen zurücksendet.

| **Problem**                                 | **Error**                | **Message**                                                             | **Status** |
| ------------------------------------------- | ------------------------ | ----------------------------------------------------------------------- | ---------- |
| User not found                              | userNotFound             | User with id [userId] not found                                         | 404        |
| Missing information in body                 | missingInfo              | Please provide type and name of the custom item you want to deactivate. | 400        |
| Custom not found                            | customNotFound           | Custom item [name] of type [type] not found.                            | 404        |
| Checkin not found                           | checkinNotFound          | Checkin not found                                                       | 404        |
| Family not found                            | familyNotFound           | Family [family] not found                                               | 404        |
| Tag not found                               | tagNotFound              | Tag [tag] not found                                                     | 404        |
| Error on user verification check            | userNotVerified          | User with email [email] not verified                                    | 401        |
| Cookie is missing                           | cookieIsMissing          | Cookie is missing or has expired.                                       | 400        |
| Verification has failed                     | verificationHasFailed    | Cookie could not be verified.                                           | 400        |
| Missing credentials                         | missingCredentials       | Missing login data                                                      | 400        |
| Missing registration data                   | missingRegData           | Missing registration data                                               | 400        |
| Invalid password                            | invalidPassword          | Password is invalid                                                     | 400        |
| Error on hashing                            | hashError                | Error on hashing                                                        | 500        |
| Error on generating verification token      | verTokenError            | Error on generating verification token                                  | 500        |
| Error on password validation                | passValidation           | Password format is invalid                                              | 400        |
| Error on getting access token secret        | envError                 | Error on getting access token secret                                    | 500        |
| Error on generating access token            | accTokenError            | Error on generating access token                                        | 500        |
| Verification token is missing               | verificationTokenMissing | Verification token is missing                                           | 401        |
| User with this verification token not found | userNotFoundByToken      | User with verification token [token] not found                          | 404        |
| Wrong Password (at password change)         | wrongPassword            | Missing or incorrect current password                                   | 403        |

 </details>

---

## 🎓 Projektrahmen

Dieses Backendprojekt ist Teil eines Abschlussprojekts, das von [luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney), [Barış Balcı](https://github.com/barisbalcimusic) & [hannahnier](https://github.com/hannahnier) zum Ende einer einjährigen Vollzeit-Weiterbildung im Bereich Fullstack-Webdevelopment entwickelt wurde. Zusammen mit dem dazugehörigen [Frontend-Repository](https://github.com/MindfulStudio/frontend) ist dabei eine umfassende Browser-App für Mentale Gesundheit entstanden.

---

## 📜 Lizenz

Wird noch ergänzt.

---

## 📧 Kontakt

[luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney), [Barış Balcı](https://github.com/barisbalcimusic), [hannahnier](https://github.com/hannahnier)

</details>
