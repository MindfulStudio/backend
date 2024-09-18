import jwt from "jsonwebtoken";

// GENERATE ACCESS TOKEN:
export const generateAccessToken = (userId, accessTokenSecret) => {
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
