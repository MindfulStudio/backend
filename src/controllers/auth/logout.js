// LOGOUT

export const logout = async (req, res, next) => {
  try {
    // CLEAR COOKIE
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
    });
    res.status(200).json({ message: "Logout successfull" });
  } catch (error) {
    next(error);
  }
};
