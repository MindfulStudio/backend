// BASIC ERROR MIDDLEWARE
export const errorMiddleware = (err, req, res, next) => {
  console.log("errorMiddleware:", err);
  res.status(500).json({ error: err });
};
