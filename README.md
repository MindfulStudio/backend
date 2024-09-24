# Backend for a Mental Health App

## 📖 Description

This is the backend for a mental health application that allows users to log and analyze their emotional states along with contextual details. It supports user authentication using cookies and JSON Web Token. This backend provides endpoints for registration, login/logout and email verification of users and endpoints that allow users to manage and evaluate their regular check-ins. It is built using Node.js, Express.js and MongoDB with Mongoose for data modeling.

---

## 🛠 Technologies Used

- **Backend & Server:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Token, Cookies, Nodemailer
- **Captcha:** Google reCAPTCHA
- **Validation:** Mongoose Schema Validation

---

## 🚀 Installation

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

---

## 📑 API Documentation

The API documentation will be added in the future.

---

## 🎓 Project Context

This backend is part of a collaborative Final Project completed by [luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney), [Barış Balcı](https://github.com/barisbalcimusic) & [hannahnier](https://github.com/hannahnier) at the end of a one-year full-time course in Fullstack Web Development. It operates alongside a [Frontend repository](https://github.com/MindfulStudio/frontend) to create a comprehensive Browser Application on the subject of Mental Health.

---

## 📜 License

To be added.

---

## 📧 Contact

[luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney), [Barış Balcı](https://github.com/barisbalcimusic), [hannahnier](https://github.com/hannahnier)

<br>
<br>

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

---

## 📑 API-Dokumentation

Die nachfolgende Übersicht fasst alle möglichen Operationen mit ihren dazugehörigen Endpoints, HTTP-Methoden und den im Body der Anfrage zu sendenden Informationen zusammen und zeigt auf, welche Antworten im Erfolgsfall und bei Fehlern vom Server zu erwarten sind.

---

### Authentifizierung

| **Operation**           | **Endpoint**           | **HTTP-Methode** | **Body**                        | **Status** | **Fehlermeldungen**                                           |
| ----------------------- | ---------------------- | ---------------- | ------------------------------- | ---------- | ------------------------------------------------------------- |
| Registrierung           | `/auth/register`       | POST             | `{ username, email, password }` | 201        | `missingRegData` (400)                                        |
| Login                   | `/auth/login`          | POST             | `{ email, password }`           | 200        | `missingCredentials` (400)                                    |
| Logout                  | `/auth/logout`         | POST             | Keine                           | 200        | `cookieIsMissing` (400)                                       |
| Verifizierung           | `/auth/verify`         | GET              | `?token=${verificationToken}`   | 200        | `verificationTokenMissing` (401), `userNotFoundByToken` (404) |
| Zugangstoken generieren | `/auth/token`          | POST             | `{ refreshToken }`              | 200        | `envError`, `accTokenError` (500)                             |
| Passwort zurücksetzen   | `/auth/reset-password` | POST             | `{ email }`                     | 200        | `missingCredentials` (400)                                    |

**Hinweis: Für alle Endpunkte außerhalb der Authentifizierungs-Operationen ist eine gültige Sitzung erforderlich**. Diese Sitzung wird durch einen Cookie identifiziert, den man beim erfolgreichen Login über den Endpunkt `/auth/login` erhält.

### User-bezogene Operationen (nach Authentifizierung)

| **Operation**                          | **Endpoint**                 | **HTTP-Methode** | **Body**                             | **Status** | **Fehlermeldungen**                                        |
| -------------------------------------- | ---------------------------- | ---------------- | ------------------------------------ | ---------- | ---------------------------------------------------------- |
| Alle Check-ins abrufen                 | `/users/checkins`            | GET              | Keine                                | 200        | `userNotFound` (404)                                       |
| Check-ins von heute abrufen            | `/users/checkins/today`      | GET              | Keine                                | 200        | `userNotFound` (404)                                       |
| Einzelnen Check-in abrufen             | `/users/checkins/:checkinId` | GET              | Keine                                | 200        | `userNotFound`, `checkinNotFound` (404)                    |
| Check-in erstellen                     | `/users/checkins`            | POST             | `{ emotion, tags, comment, config }` | 201        | `userNotFound` (404)                                       |
| Statistiken nach Emotionsfamilie       | `/users/stats/family`        | GET              | `?family=${familyName}`              | 200        | `userNotFound`, `familyNotFound` (404)                     |
| Statistiken nach Kontext-Begriff       | `/users/stats/tag`           | GET              | `?tag=${tagName}`                    | 200        | `userNotFound`, `tagNotFound` (404)                        |
| User-spezifische Elemente abrufen      | `/users/customs`             | GET              | Keine                                | 200        | `userNotFound` (404)                                       |
| User-spezifisches Element deaktivieren | `/users/customs`             | PATCH            | `{ type, name }`                     | 200        | `userNotFound`, `missingInfo`, `customNotFound` (404, 400) |

---

## 🎓 Projektrahmen

Dieses Backendprojekt ist Teil eines Abschlussprojekts, das von [luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney), [Barış Balcı](https://github.com/barisbalcimusic) & [hannahnier](https://github.com/hannahnier) zum Ende einer einjährigen Vollzeit-Weiterbildung im Bereich Fullstack-Webdevelopment entwickelt wurde. Zusammen mit dem dazugehörigen [Frontend-Repository](https://github.com/frontend-repo-link) ist dabei eine umfassende Browser-App für Mentale Gesundheit entstanden.

---

## 📜 Lizenz

Wird noch ergänzt.

---

## 📧 Kontakt

[luisePkt](https://github.com/luisePkt), [Nadja Probst](https://github.com/nadjascodejourney), [Barış Balcı](https://github.com/barisbalcimusic), [hannahnier](https://github.com/hannahnier)
