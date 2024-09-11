export const errorMiddleware = (err, req, res, next) => {
  // HANDLE VALIDATION ERRORS
  if (err.name === "ValidationError") {
    const errors = [];
    for (const errField in err.errors) {
      errors.push({
        path: err.errors[errField].path,
        message: err.errors[errField].message,
      });
    }
    return res.status(400).json({ errorType: "ValidationError", errors });
  }
  // HANDLE OTHER ERRORS
  console.log("errorMiddleware:", err);
  res.status(500).json({ error: err });
};
