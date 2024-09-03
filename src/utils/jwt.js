import jwt from "jsonwebtoken";

export const generateAccessToken = (id, accessTokenSecret) => {
  return jwt.sign({ id }, accessTokenSecret, {
    expiresIn: "1h",
  });
};
