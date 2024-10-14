import jwt from "jsonwebtoken";

// GENERATE ACCESS TOKEN:
export const generateAccessToken = (
  userId,
  accessTokenSecret,
  stayLoggedIn
) => {
  return jwt.sign({ userId }, accessTokenSecret, {
    expiresIn: stayLoggedIn ? "7d" : "1h",
  });
};

// VERIFY ACCESS TOKEN:
export const jwtVerify = (token, accessTokenSecret) => {
  return jwt.verify(token, accessTokenSecret, (error, payload) => {
    if (error) {
      return error;
    } else {
      return payload;
    }
  });
};

// GENERATE PASSWORD RESET TOKEN:
export const jwtSignPwResetToken = (id, accessTokenSecret) => {
  return jwt.sign({ id }, accessTokenSecret, {
    expiresIn: "1h",
  });
};

// VERIFY ACCESS TOKEN:
export const jwtVerifyPwResetToken = (token, accessTokenSecret) => {
  return jwt.verify(token, accessTokenSecret, (error, payload) => {
    if (error) {
      return error;
    } else {
      return payload;
    }
  });
};
