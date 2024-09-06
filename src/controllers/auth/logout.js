// LOGOUT

export const logout = async (req, res, next) => {
  try {
    // CLEAR COOKIE
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logout successfull" });
  } catch (error) {
    next(error);
  }
};
